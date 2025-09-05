import { GitHubActionsAdapter } from "../adapters/githubActions";
import { DockerfileParser } from "dockerfile-ast";
import { promises as fs } from "fs";
import { githubaActionsReporters } from "../reporters/githubaActionsReporters";
import * as utils from "../utils";
import { Position } from "vscode-languageserver-types";
export class LR_002_setWorkdir {
  constructor(
    private adapter: GitHubActionsAdapter,
    private reporter: githubaActionsReporters // Need to use general ClassReporter
  ) {}

  async execute() {
    try {
      const dockerfilePath = await utils.finder({
        dir: this.adapter.workspace,
        file: "Dockerfile", //TODO: Dont consider other names for dockerfile
        ignore: ["node_modules/**"],
        onlyFiles: true,
      });

      if (dockerfilePath.length === 0) {
        this.reporter.infoError("No Dockerfile found in LR_002_setWorkdir");
        return;
      }

      //TODO Adapter in this function for AST parsing
      const dockerfileContent = await fs.readFile(dockerfilePath[0], "utf8"); //TODO: Consider multiple dockerfiles
      const dockerfile = DockerfileParser.parse(dockerfileContent);
      for (const instruction of dockerfile.getInstructions()) {
        const keyword = instruction.getKeyword();
        const args = instruction.getArguments();
        const range = instruction.getRange(); //? I Dont understand keyword and args

        console.log(`🔹 ${keyword}`);
        console.log(`   Argumentos: ${args.join(" ")}`);
        console.log(
          `   Posição: linha ${range.start.line + 1}, coluna ${
            range.start.character + 1
          }, range: [${range.start.line + 1},${
            range.start.character + 1
          }] até [${range.end.line + 1},${range.end.character + 1}]`
        );

        if (instruction.getKeyword().toUpperCase() === "WORKDIR") {
          this.reporter.infoSuccess(
            `Great you have a WORKDIR instruction in your Dockerfile at: ${dockerfilePath[0]}`
          );
          return;
        }
      }
      // If i dont make return in the for loop, means that no WORKDIR was found
      await this.reporter.newIssue({
        title: "No WORKDIR instruction found in Dockerfile",
        body: `Your Dockerfile located at ${dockerfilePath[0]} does not contain a WORKDIR instruction. It's recommended to set a WORKDIR to ensure that your application runs in the correct directory context. This practice breaches the LR_002_setWorkdir rule.`,
        labels: ["LR_002_setWorkdir", "dockerfile", "scan-dockerfile"],
      });
      this.reporter.infoWarning(
        `No WORKDIR instruction found in your Dockerfile at: ${dockerfilePath[0]}`
      );
      return;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error executing LR_002_setWorkdir:`, errorMsg);
      throw new Error(`Failed to execute LR_002_setWorkdir: ${errorMsg}`);
    }
  }
}
