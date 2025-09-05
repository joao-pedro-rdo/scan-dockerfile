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

      const dockerfileContent = await fs.readFile(dockerfilePath[0], "utf8"); //TODO: Consider multiple dockerfiles
      const dockerfile = DockerfileParser.parse(dockerfileContent);
      for (const instruction of dockerfile.getInstructions()) {
        // console.log("Keyword:", instruction.getKeyword());
        // console.log("Instruction:", instruction.getInstruction());

        const keyword = instruction.getKeyword();
        const args = instruction.getArguments();
        const range = instruction.getRange();
        const instr = instruction.getInstruction();
        const { line, column } = getLineAndColumn(
          dockerfileContent,
          Number(range.start)
        );

        console.log(`🔹 ${keyword} (${instr})`);
        console.log(`   Argumentos: ${args.join(" ")}`);
        console.log(
          `   Posição: linha ${line}, coluna ${column}, range: [${range.start}, ${range.end}]`
        );

        if (instruction.getKeyword().toUpperCase() === "WORKDIR") {
          this.reporter.infoSuccess(
            `Great you have a WORKDIR instruction in your Dockerfile at: ${dockerfilePath[0]}`
          );
        }
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error executing LR_002_setWorkdir:`, errorMsg);
      throw new Error(`Failed to execute LR_002_setWorkdir: ${errorMsg}`);
    }
  }
}

function getLineAndColumn(
  content: string,
  index: number
): { line: number; column: number } {
  const lines = content.slice(0, index).split("\n");
  const line = lines.length;
  const column = lines[lines.length - 1].length + 1;
  return { line, column };
}
