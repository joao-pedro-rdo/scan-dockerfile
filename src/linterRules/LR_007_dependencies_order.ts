import { IGitHubActionsAdapter } from "../contracts/githubActionsInterface";
import { githubaActionsReporters } from "../reporters/githubaActionsReporters";
import { ILinterRule } from "../contracts/LR_interface";
import { AdapterDockerfileAST } from "../refactor/dockerfileAST";
import { IResponseAstDockerfile } from "../refactor/dockerfileAST";
import { promises as fs } from "fs";
import * as utils from "../utils";
import { HeuristicDependenciesOrderImpl } from "../heuristic/heuristic_dependencies_order";
import { RefactorRequest } from "../contracts/iaServiceInterface";

interface Operation {
  source: string;
  destination: string;
  line: number;
  keyword: string;
  itemIndex: number;
  sourceIndex: number;
  type: string;
}

export class LR_007_dependencies_order implements ILinterRule {
  constructor(
    private adapter: IGitHubActionsAdapter,
    private reporter: githubaActionsReporters, // Need to use general ClassReporter
    public issueTitle: string = "Ensure dependencies are installed in the correct order",
    public rule: string = "LR_007_dependencies_order",
    public heuristc = new HeuristicDependenciesOrderImpl()
    // public listDependencies: JSON[],
    // public listSource: JSON[]
  ) {}
  async execute(name_Dockerfile: string): Promise<any> {
    try {
      const dockerfilePath = await this.searchDockerfilePath(name_Dockerfile);
      const dockerfileContent = await fs.readFile(dockerfilePath[0], "utf8");
      const dockerfile = new AdapterDockerfileAST(dockerfileContent);

      // ask the AST to search for COPY
      const searchResult = await dockerfile.searchConsecutiveKeyword({
        keyword: "COPY",
        args: [],
      });

      console.log("SEARCH RESULT COPY", searchResult);

      const operations = await this.verify_type(searchResult);

      const hasViolation = await this.verify_order(operations);

      if (hasViolation) {
        console.log("❌ Violation detected! Dependencies should come before source code.");
        this.prepareRefactorRequest(searchResult, dockerfileContent, operations);
        // // Reporta a issue
        // await this.reporter.newIssueIfNotExists({
        //   title: this.issueTitle,
        //   body: this.formatIssueBody(operations),
        //   labels: ["dockerfile", "optimization"],
        // });
      } else {
        console.log("✅ No violations found! Dependencies are correctly ordered.");
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error executing ${this.rule}:`, errorMsg);
      throw new Error(`Failed to execute ${this.rule}: ${errorMsg}`);
    }
  }
  private prepareRefactorRequest(
    searchResult: Array<IResponseAstDockerfile>,
    dockerfileContent: string,
    operations: Operation[]
  ): RefactorRequest {
    const context = `
    
    PROBLEM: The following Dockerfile has COPY instructions where dependencies are not ordered correctly. Dependencies should be copied before source code to optimize caching and build efficiency. Here are the operations detected:\n\n${operations
      .map(
        (op) =>
          `Line ${op.line}: ${op.keyword} ${op.source} -> ${op.destination} [Type: ${op.type}]`
      )
      .join(
        "\n"
      )}\n\nPlease refactor the Dockerfile to ensure all dependencies are copied before any source code.
      
      AFECTED LINES:\n\n${searchResult
        .map((res) => `Line ${res.line[0]}: ${res.keyword[0]} ${res.args.join(" ")}`)
        .join("\n")}\n\n
      
      SUGGESTION: Switch the order of COPY instructions so that all dependencies are copied before source code.
    
    
      FULL DOCKERFILE CONTEXT:
      ${dockerfileContent}

      `;
    console.log(" 📧Context prepared for AI:", context);
    return { context };
  }

  private async verify_order(obj: Operation[]): Promise<{
    hasViolation: boolean;
    violations: Array<{
      dependency: Operation;
      sourcesBeforeIt: Operation[];
    }>;
  }> {
    const dependencies = obj.filter((op) => op.type === "dependency");
    const sources = obj.filter((op) => op.type === "source");

    if (dependencies.length === 0 || sources.length === 0) {
      return { hasViolation: false, violations: [] };
    }

    const violations: Array<{
      dependency: Operation;
      sourcesBeforeIt: Operation[];
    }> = [];

    // Para cada dependência
    for (const dependency of dependencies) {
      // Encontra todos os sources que vêm ANTES desta dependência
      const sourcesBeforeIt = sources.filter((source) => source.line < dependency.line);

      if (sourcesBeforeIt.length > 0) {
        violations.push({
          dependency,
          sourcesBeforeIt,
        });
      }
    }

    return {
      hasViolation: violations.length > 0,
      violations,
    };
  }

  private async verify_type(obj: Array<IResponseAstDockerfile>): Promise<Operation[]> {
    const operations = this.normalizeOperations(obj);
    console.log("Normalized Operations:", operations);
    const classified = operations.map((op) => ({
      ...op,
      type: this.classifyOperation(op),
    }));
    console.log("Classified Operations:", classified);
    return classified;
  }

  private async searchDockerfilePath(name_Dockerfile: string): Promise<string[]> {
    const dockerfilePath = await utils.finder({
      dir: this.adapter.workspace,
      file: name_Dockerfile,
      ignore: ["node_modules/**"],
      onlyFiles: true,
    });
    return dockerfilePath;
  }

  /** Normalize operations to have one source per object, some COPY/ADD can have multiple sources
   * @param obj Array of IResponseAstDockerfile
   * @returns Array of normalized operations
   * @example
   */
  private normalizeOperations(obj: Array<IResponseAstDockerfile>) {
    return obj.flatMap((item, itemIndex) => {
      if (item.args.length < 2) return [];

      const destination = item.args[item.args.length - 1];
      const sources = item.args.slice(0, -1);

      return sources.map((source, sourceIndex) => ({
        source,
        destination,
        line: item.line[0],
        keyword: item.keyword[0],
        itemIndex,
        sourceIndex,
        type: this.classifyOperation({
          source,
          destination,
          line: item.line[0],
          keyword: item.keyword[0],
        }),
      }));
    });
  }

  // Classify operation as 'dependency' or 'source' or 'unknown'
  public classifyOperation(operation: {
    source: string;
    destination: string;
    line: number;
    keyword: string;
  }): string {
    for (let i = 0; i < this.heuristc.listDependecy.length; i++) {
      if (operation.source === this.heuristc.listDependecy[i]) {
        return "dependency";
      }
      if (operation.source === this.heuristc.listSorces[i]) {
        return "source";
      }
    }
    return "unknown";
  }

  // public async verify_order(obj: Operation[]): Promise<boolean> {

  // }
  // Passo 03: Verificar se há alguma instrução do tipo "source" posicionada após uma instrução do tipo "dependency". Se sim, retornar TRUE. Caso contrário, retornar FALSE.
}
