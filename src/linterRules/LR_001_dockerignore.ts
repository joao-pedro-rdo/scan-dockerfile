import {
  IAdapter,
  IGitHubActionsAdapter,
} from "../adapters/githubActionsInterface";
import {
  IgithubaActionsReporters,
  IReporter,
} from "../adapters/reporterInterfce";
import * as utils from "../utils";
import { ILinterRule } from "../contracts/LR_interface";

/**
 * Linter rule LR_001_dockerignore checks if a .dockerignore file exists in the repository.
 * @param {IAdapter} adapter - The GitHub Actions adapter for accessing the workspace.
 * @param {IgithubaActionsReporters} reporter - The reporter for logging and issue creation.
 */
export class LR_001_dockerignore implements ILinterRule {
  constructor(
    private adapter: IGitHubActionsAdapter,
    private reporter: IgithubaActionsReporters, // Need to use general ClassReporter
    public issueTitle: string = "No .dockerignore files found",
    public rule: string = "LR_001_dockerignore"
  ) {}

  /**
   * This method checks for the presence of a .dockerignore file in the repository.
   * If not found, it creates a GitHub issue recommending adding one.
   * This method uses a file finder utility to search for the .dockerignore file automatically.
   * @returns {Promise<void>} - A promise that resolves when the check is complete.
   */
  async execute() {
    try {
      const dockerignoreFiles = await utils.finder({
        dir: this.adapter.workspace,
        file: ".dockerignore",
        ignore: ["node_modules/**"],
        onlyFiles: true,
      });

      if (dockerignoreFiles.length > 0) {
        this.reporter.infoSuccess(
          `Great you have a .dockerignore file found at: ${dockerignoreFiles.join(
            ", "
          )}`
        );
        this.reporter.addTableRow({
          rule: this.rule,
          status: "✔️",
          details: this.issueTitle,
          link: "",
        });
        return;
      }

      //* Test of method newIssueIfNotExists
      const issue = await this.reporter.newIssueIfNotExists({
        title: this.issueTitle,
        body: "Your project don't have .dockerignore files, this can lead to larger image sizes and potential security risks. It's recommended to add a .dockerignore file to exclude unnecessary files and directories from your Docker images. This pratices breachs the LR_001_dockerignore rule.",
        labels: ["LR_001_dockerignore", "dockerfile", "scan-dockerfile"],
      });

      //* Issue never be null here, because if dont exists, the method create one
      if (issue != null) {
        this.reporter.infoWarning(
          `Issue created: ${issue.html_url} - No .dockerignore files found`
        );

        this.reporter.addTableRow({
          rule: this.rule,
          status: "❌",
          details: this.issueTitle,
          link: issue.html_url,
        });
        return;
      }

      // await this.reporter.newIssue({
      //   title: this.issueTitle,
      //   body: "Your project don't have .dockerignore files, this can lead to larger image sizes and potential security risks. It's recommended to add a .dockerignore file to exclude unnecessary files and directories from your Docker images. This pratices breachs the LR_001_dockerignore rule.",
      //   labels: ["LR_001_dockerignore", "dockerfile", "scan-dockerfile"],
      // });
      this.reporter.infoWarning("No .dockerignore files found");
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error executing LR_001_dockerignore:`, errorMsg);
      throw new Error(`Failed to execute LR_001_dockerignore: ${errorMsg}`);
    }
  }
}
