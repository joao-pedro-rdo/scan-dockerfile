import { IGitHubActionsAdapter } from "../contracts/githubActionsInterface";
import { AdapterDockerfileAST } from "../refactor/dockerfileAST";
import { githubaActionsReporters } from "../reporters/githubaActionsReporters";
import { ILinterRule } from "../contracts/LR_interface";
import { promises as fs } from "fs";
import * as utils from "../utils";

export class LR_004_user implements ILinterRule {
  constructor(
    private adapter: IGitHubActionsAdapter,
    private reporter: githubaActionsReporters, // Need to use general ClassReporter
    public issueTitle: string = "User instruction found in Dockerfile",
    public rule: string = "LR_004_user"
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
        throw new Error("No Dockerfile found in LR_004_declarePortUsage");
      }
      //TODO: Consider multiple dockerfiles
      const dockerfileContent = await fs.readFile(dockerfilePath[0], "utf8");
      const dockerfile = new AdapterDockerfileAST(dockerfileContent);

      // ask the AST to search for RUN
      const searchResult_01 = await dockerfile.searchKeyword({
        keyword: "RUN",
        args: ["useradd"],
      });

      const searchResult_02 = await dockerfile.searchKeyword({
        keyword: "USER",
        args: [],
      });

      if (
        searchResult_01.keyword.length > 0 &&
        searchResult_02.keyword.length > 0
      ) {
        this.reporter.infoSuccess(
          `Great you have a USER instruction in your Dockerfile and Declared user at: ${dockerfilePath[0]}`
        );
        this.reporter.addTableRow({
          rule: this.rule,
          status: "✔️",
          details: this.issueTitle,
          link: "",
        });
        return;
      }

      const issue = await this.reporter.newIssueIfNotExists({
        title: this.issueTitle,
        body: `Your Dockerfile located at ${dockerfilePath[0]} does not contain a USER instruction. It's recommended to set a USER to ensure that your application runs in the correct directory context. This practice breaches the LR_004_USER rule.`,
        labels: ["LR_004_USER", "dockerfile", "scan-dockerfile"],
      });
      // TODO Correct bug
      //! I think in the fist time with the method is execute, this method dont create a row in the asummary

      if (issue != null) {
        this.reporter.infoWarning(`Issue created: ${issue.html_url}`);

        this.reporter.addTableRow({
          rule: this.rule,
          status: "❌",
          details: this.issueTitle,
          link: issue.html_url,
        });
      }

      return;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error executing LR_004_user:`, errorMsg);
      throw new Error(`Failed to execute LR_004_user: ${errorMsg}`);
    }
  }
}
