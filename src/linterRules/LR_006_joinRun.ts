import { IGitHubActionsAdapter } from "../contracts/githubActionsInterface";
import { githubaActionsReporters } from "../reporters/githubaActionsReporters";
import { ILinterRule } from "../contracts/LR_interface";
import { AdapterDockerfileAST } from "../refactor/dockerfileAST";
import { promises as fs } from "fs";
import * as utils from "../utils";
import { LangchainService } from "../refactor/langChain";

export class LR_006_joinRun implements ILinterRule {
  constructor(
    private adapter: IGitHubActionsAdapter,
    private reporter: githubaActionsReporters,
    // private iaService: LangchainService,
    public issueTitle: string = "Join RUN commands to reduce layers",
    public rule: string = "LR_006_joinRun"
  ) {}

  async execute(): Promise<void> {
    try {
      const dockerfilePath = await utils.finder({
        dir: this.adapter.workspace,
        file: "Dockerfile", //TODO: Dont consider other names for dockerfile
        ignore: ["node_modules/**"],
        onlyFiles: true,
      });

      if (dockerfilePath.length === 0) {
        throw new Error("No Dockerfile found in LR_006_joinRun");
      }

      const dockerfileContent = await fs.readFile(dockerfilePath[0], "utf8");
      const dockerfile = new AdapterDockerfileAST(dockerfileContent);

      // Serach for join consecutive RUN instructions
      const searchResult = await dockerfile.searchConsecutiveKeyword({
        keyword: "RUN",
        args: [],
      });

      console.log("++++++  Search Result RUN: ", searchResult);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error executing LR_006_joinRun:`, errorMsg);
      throw new Error(`Failed to execute LR_006_joinRun : ${errorMsg}`);
    }
  }
}
