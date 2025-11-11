import { IGitHubActionsAdapter } from "../contracts/githubActionsInterface";
import { githubaActionsReporters } from "../reporters/githubaActionsReporters";
import { ILinterRule } from "../contracts/LR_interface";
import { AdapterDockerfileAST } from "../refactor/dockerfileAST";
import { promises as fs } from "fs";
import * as utils from "../utils";

export class LR_007_dependencies_order implements ILinterRule {
  constructor(
    private adapter: IGitHubActionsAdapter,
    private reporter: githubaActionsReporters, // Need to use general ClassReporter
    public issueTitle: string = "Ensure dependencies are installed in the correct order",
    public rule: string = "LR_007_dependencies_order"
  ) {}
  private async searchDockerfilePath(name_Dockerfile: string): Promise<string[]> {
    const dockerfilePath = await utils.finder({
      dir: this.adapter.workspace,
      file: name_Dockerfile,
      ignore: ["node_modules/**"],
      onlyFiles: true,
    });
    return dockerfilePath;
  }
  async execute(name_Dockerfile: string): Promise<any> {
    try {
      const dockerfilePath = await this.searchDockerfilePath(name_Dockerfile);
      const dockerfileContent = await fs.readFile(dockerfilePath[0], "utf8");
      const dockerfile = new AdapterDockerfileAST(dockerfileContent);

      // ask the AST to search for COPY
      const searchResult = await dockerfile.searchKeyword({
        keyword: "COPY",
        args: [],
      });
      console.log("SEARCH RESULT COPY", searchResult);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error executing ${this.rule}:`, errorMsg);
      throw new Error(`Failed to execute ${this.rule}: ${errorMsg}`);
    }
  }
}
