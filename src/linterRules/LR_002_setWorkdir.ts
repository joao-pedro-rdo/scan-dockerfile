import { GitHubActionsAdapter } from "../adapters/githubActions";
import { promises as fs } from "fs";
import { githubaActionsReporters } from "../reporters/githubaActionsReporters";
import * as utils from "../utils";
import {
  AdapterDockerfileAST,
  IRequestAstDockerfile,
  IResponseAstDockerfile,
} from "../refactor/dockerfileAST";
import { ILinterRule } from "../contracts/LR_interface";
import { ITableRow } from "../contracts/reporterInterfce";
import { IGitHubActionsAdapter } from "../contracts/githubActionsInterface";
/**
 * Linter rule LR_002_setWorkdir checks if a Dockerfile contains a WORKDIR instruction.
 * @param {GitHubActionsAdapter} adapter - The GitHub Actions adapter for accessing the workspace.
 * @param {githubaActionsReporters} reporter - The reporter for logging and issue creation.
 */
export class LR_002_setWorkdir implements ILinterRule {
  constructor(
    private adapter: IGitHubActionsAdapter,
    private reporter: githubaActionsReporters, // Need to use general ClassReporter
    public issueTitle: string = "No WORKDIR instruction found in Dockerfile",
    public rule: string = "LR_002_setWorkdir"
  ) {}
  private async searchDockerfilePath(
    name_Dockerfile: string
  ): Promise<string[]> {
    const dockerfilePath = await utils.finder({
      dir: this.adapter.workspace,
      file: name_Dockerfile,
      ignore: ["node_modules/**"],
      onlyFiles: true,
    });
    return dockerfilePath;
  }
  /** Check if the Dockerfile contains a WORKDIR instruction.
   * If not, create a GitHub issue recommending adding a WORKDIR instruction.
   * This method uses the AdapterDockerfileAST to parse and analyze the Dockerfile.
   * And search your Dockerfile automatically
   * @returns {Promise<void>} - A promise that resolves when the check is complete.
   * @param name_Dockerfile - Name of the Dockerfile to search for
   */
  async execute(name_Dockerfile: string): Promise<void> {
    try {
      const dockerfilePath = await this.searchDockerfilePath(name_Dockerfile);
      if (dockerfilePath.length === 0) {
        throw new Error("No Dockerfile found in LR_002_setWorkdir");
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
        this.reporter.addTableRow({
          rule: this.rule,
          status: "✔️",
          details: this.issueTitle,
          link: "",
        });
        return;
      }
      // If i dont make return in the for loop, means that no WORKDIR was found
      // await this.reporter.newIssue({
      //   title: this.issueTitle,
      //   body: `Your Dockerfile located at ${dockerfilePath[0]} does not contain a WORKDIR instruction. It's recommended to set a WORKDIR to ensure that your application runs in the correct directory context. This practice breaches the LR_002_setWorkdir rule.`,
      //   labels: ["LR_002_setWorkdir", "dockerfile", "scan-dockerfile"],
      // });

      const issue = await this.reporter.newIssueIfNotExists({
        title: this.issueTitle,
        body: `Your Dockerfile located at ${dockerfilePath[0]} does not contain a WORKDIR instruction. It's recommended to set a WORKDIR to ensure that your application runs in the correct directory context. This practice breaches the LR_002_setWorkdir rule.`,
        labels: ["LR_002_setWorkdir", "dockerfile", "scan-dockerfile"],
      });

      if (issue != null) {
        this.reporter.infoWarning(`Issue created: ${issue.html_url}`);

        this.reporter.addTableRow({
          rule: this.rule,
          status: "❌",
          details: this.issueTitle,
          link: issue.html_url,
        });
      }

      // this.reporter.infoWarning(
      //   `No WORKDIR instruction found in your Dockerfile at: ${dockerfilePath[0]}`
      // );
      return;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error executing LR_002_setWorkdir:`, errorMsg);
      throw new Error(`Failed to execute LR_002_setWorkdir: ${errorMsg}`);
    }
  }
}
