import { IGitHubActionsAdapter } from "../contracts/githubActionsInterface";
import { githubaActionsReporters } from "../reporters/githubaActionsReporters";
import { ILinterRule } from "../contracts/LR_interface";
import { AdapterDockerfileAST } from "../refactor/dockerfileAST";
import { IResponseAstDockerfile } from "../refactor/dockerfileAST";
import { promises as fs } from "fs";
import * as utils from "../utils";
import { HeuristicDependenciesOrderImpl } from "../heuristic/heuristic_dependencies_order";
import { RefactorRequest } from "../contracts/iaServiceInterface";
import { LangchainService } from "../refactor/langChain";
import { LangchainServiceTestLLM } from "../refactor/langChainTesteLLM";

interface Operation {
  source: string;
  destination: string;
  line: number;
  keyword: string;
  itemIndex: number;
  sourceIndex: number;
  type: string;
}

export class LR_007_test {
  constructor(
    private adapter: IGitHubActionsAdapter,
    private reporter: githubaActionsReporters, // Need to use general ClassReporter
    private iaService: LangchainServiceTestLLM,
    public promptRefactor: string,
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
        const refactorRequest = this.prepareRefactorRequest(
          searchResult,
          dockerfileContent,
          operations
        );
        const aiSuggestion = await this.iaService.suggestRefactor(refactorRequest);
        console.log("++++++ RETURN IA: ", aiSuggestion.code);
        console.log("++++++ RETURN IA SUGGESTION: ", aiSuggestion.suggestion);
        console.log("++++++ RETURN IA EXPLANATION: ", aiSuggestion.explanation);
        console.log("++++++ RETURN IA CONFIDENCE: ", aiSuggestion.confidence);
        const issueBody = this.formatIssueBody(searchResult, aiSuggestion, dockerfileContent);
        const issue = await this.reporter.newIssueIfNotExists({
          title: this.issueTitle,
          body: issueBody,
          labels: ["dockerfile", "LR_007_dependencies_order", "ai-suggestion"],
        });
        if (issue != null) {
          this.reporter.infoWarning(`Issue created: ${issue.html_url}`);

          this.reporter.addTableRow({
            rule: this.rule,
            status: "⚠️",
            details: `${searchResult.length} COPY instructions out of order`,
            link: issue.html_url,
          });
        }

        console.log("Issue created or already exists:", issue.html_url);
        // // Reporta a issue
        // await this.reporter.newIssueIfNotExists({
        //   title: this.issueTitle,
        //   body: this.formatIssueBody(operations),
        //   labels: ["dockerfile", "optimization"],
        // });
      } else {
        console.log("✅ No violations found! Dependencies are correctly ordered.");
        this.reporter.infoSuccess(
          `Great! No violations found! Dependencies are correctly ordered. ${dockerfilePath[0]}`
        );
        this.reporter.addTableRow({
          rule: this.rule,
          status: "✔️",
          details: this.issueTitle,
          link: "",
        });
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error executing ${this.rule}:`, errorMsg);
      throw new Error(`Failed to execute ${this.rule}: ${errorMsg}`);
    }
  }

  private formatIssueBody(
    searchResult: Array<IResponseAstDockerfile>,
    aiSuggestion: {
      code: string;
      suggestion: string;
      explanation: string;
      confidence: number;
    },
    dockerfileContent: string
  ): string {
    const affectedLines = searchResult
      .map((res) => `Line ${res.line[0]}: ${res.keyword[0]} ${res.args.join(" ")}`)
      .join("\n");

    return `
### Issue: Dependencies Order Violation in Dockerfile

**Description:**
The Dockerfile contains COPY instructions where dependencies are not ordered correctly. Dependencies should be copied before source code to optimize caching and build efficiency.

**Affected Lines:**
\`\`\`
${affectedLines}
\`\`\`

**AI Suggestion:**
\`\`\`dockerfile
${aiSuggestion.code}
\`\`\`

**Explanation:**
${aiSuggestion.explanation}

**Confidence Level:** ${aiSuggestion.confidence}%
    
**Full Dockerfile Context:**
\`\`\`dockerfile
${dockerfileContent}
\`\`\`
    `;
  }
  /**
   *  Prepare the context and promptrefactor request for the IA
   * @param searchResult
   * @param dockerfileContent
   * @param operations
   * @returns RefactorRequest {context: string}
   */

  private prepareRefactorRequest(
    searchResult: Array<IResponseAstDockerfile>,
    dockerfileContent: string,
    operations: Operation[]
  ): RefactorRequest {
    const context = `
      ${this.promptRefactor}
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
