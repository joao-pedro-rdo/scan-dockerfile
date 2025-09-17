import { IGitHubActionsAdapter } from "../contracts/githubActionsInterface";
import { githubaActionsReporters } from "../reporters/githubaActionsReporters";
import { ILinterRule } from "../contracts/LR_interface";
import { AdapterDockerfileAST } from "../refactor/dockerfileAST";
import { promises as fs } from "fs";
import * as utils from "../utils";

export class LR_003_declarePortUsage implements ILinterRule {
  constructor(
    private adapter: IGitHubActionsAdapter,
    private reporter: githubaActionsReporters, // Need to use general ClassReporter
    public issueTitle: string = "EXPOSE instruction found in Dockerfile",
    public rule: string = "LR_003_declarePortUsage"
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
        throw new Error("No Dockerfile found in LR_003_declarePortUsage");
      }
      //TODO: Consider multiple dockerfiles
      const dockerfileContent = await fs.readFile(dockerfilePath[0], "utf8");
      const dockerfile = new AdapterDockerfileAST(dockerfileContent);

      // ask the AST to search for EXPOSE
      const searchResult = await dockerfile.searchKeyword({
        keyword: "EXPOSE",
        args: [],
      });

      // Check if the search result contains a WORKDIR instruction
      const { keyword, line } = searchResult;
      if (keyword.length > 0) {
        this.reporter.infoSuccess(
          `Great you have a EXPOSE instruction in your Dockerfile and Declared port usage at: ${dockerfilePath[0]}:${line}`
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
        body: `Your Dockerfile located at ${dockerfilePath[0]} does not contain a EXPOSE instruction. It's recommended to set a EXPOSE to ensure that your application runs in the correct directory context. This practice breaches the LR_003_declarePortUsage rule.`,
        labels: ["LR_003_declarePortUsage", "dockerfile", "scan-dockerfile"],
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

      return;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error executing LR_003_declarePortUsage:`, errorMsg);
      throw new Error(`Failed to execute LR_003_declarePortUsage: ${errorMsg}`);
    }
  }
}
