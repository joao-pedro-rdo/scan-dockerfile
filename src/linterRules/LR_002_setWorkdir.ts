import { GitHubActionsAdapter } from "../adapters/githubActions";
import { promises as fs } from "fs";
import { githubaActionsReporters } from "../reporters/githubaActionsReporters";
import * as utils from "../utils";
import { Position } from "vscode-languageserver-types";
import {
  AdapterDockerfileAST,
  IRequestAstDockerfile,
  IResponseAstDockerfile,
} from "../refactor/dockerfileAST";
/**
 * Linter rule LR_002_setWorkdir checks if a Dockerfile contains a WORKDIR instruction.
 * @param {GitHubActionsAdapter} adapter - The GitHub Actions adapter for accessing the workspace.
 * @param {githubaActionsReporters} reporter - The reporter for logging and issue creation.
 */
export class LR_002_setWorkdir {
  constructor(
    private adapter: GitHubActionsAdapter,
    private reporter: githubaActionsReporters // Need to use general ClassReporter
  ) {}

  /** Check if the Dockerfile contains a WORKDIR instruction.
   * If not, create a GitHub issue recommending adding a WORKDIR instruction.
   * This method uses the AdapterDockerfileAST to parse and analyze the Dockerfile.
   * And search your Dockerfile automatically
   * @returns {Promise<void>} - A promise that resolves when the check is complete.
   */
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
      //TODO: Consider multiple dockerfiles
      const dockerfileContent = await fs.readFile(dockerfilePath[0], "utf8");
      const dockerfile = new AdapterDockerfileAST(dockerfileContent);

      // ask the AST to search for WORKDIR
      const searchResult = await dockerfile.searchKeyword({
        keyword: "WORKDIR",
        args: [],
      });

      // Check if the search result contains a WORKDIR instruction
      const { keyword, line } = searchResult;
      if (keyword.length > 0) {
        this.reporter.infoSuccess(
          `Great you have a WORKDIR instruction in your Dockerfile at: ${dockerfilePath[0]}`
        );
        return;
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
