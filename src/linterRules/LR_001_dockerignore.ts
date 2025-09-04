import { IAdapter } from "../adapters/githubActionsInterface";
import {
  IgithubaActionsReporters,
  IReporter,
} from "../adapters/reporterInterfce";
import * as utils from "../utils";

export class LR_001_dockerignore {
  constructor(
    private adapter: IAdapter,
    private reporter: IgithubaActionsReporters // Need to use general ClassReporter
  ) {}

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
        return;
      }

      //! Verify if the issue already exists to avoid duplicates
      // TODO Implement a method to check existing issues

      await this.reporter.newIssue({
        title: "No Dockerignore files found",
        body: "Your project don't have .dockerignore files, this can lead to larger image sizes and potential security risks. It's recommended to add a .dockerignore file to exclude unnecessary files and directories from your Docker images. This pratices breachs the LR_001_dockerignore rule.",
        labels: ["LR_001_dockerignore", "dockerfile", "scan-dockerfile"],
      });
      this.reporter.infoWarning("No .dockerignore files found");
      this;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error executing LR_001_dockerignore:`, errorMsg);
      throw new Error(`Failed to execute LR_001_dockerignore: ${errorMsg}`);
    }
  }
}
