import { IGitHubActionsAdapter } from "../adapters/githubActionsInterface";
import { githubaActionsReporters } from "../reporters/githubaActionsReporters";
import { ILinterRule } from "../contracts/LR_interface";
import { AdapterDockerfileAST } from "../refactor/dockerfileAST";
import { promises as fs } from "fs";
import * as utils from "../utils";

export class LR_005_avoidPipUpgrade implements ILinterRule {
  constructor(
    private adapter: IGitHubActionsAdapter,
    private reporter: githubaActionsReporters, // Need to use general ClassReporter
    public issueTitle: string = "Avoid using 'pip install --upgrade'",
    public rule: string = "LR_005_avoidPipUpgrade"
  ) {}

  // Padrões a detectar no Dockerfile
  private problematicPatterns = [
    /pip\s+install\s+--upgrade/,
    /pip\s+install\s+-U/,
    /pip3\s+install\s+--upgrade/,
    /pip3\s+install\s+-U/,
  ];

  async execute() {
    try {
      const dockerfilePath = await utils.finder({
        dir: this.adapter.workspace,
        file: "Dockerfile", //TODO: Dont consider other names for dockerfile
        ignore: ["node_modules/**"],
        onlyFiles: true,
      });

      if (dockerfilePath.length === 0) {
        throw new Error("No Dockerfile found in LR_005_avoidPipUpgrade");
      }

      const dockerfileContent = await fs.readFile(dockerfilePath[0], "utf8");
      const dockerfile = new AdapterDockerfileAST(dockerfileContent);

      //   const searchResult = dockerfile.searchPattern(this.problematicPatterns);
      const searchResult = dockerfile.searchFirstPattern(
        this.problematicPatterns
      );
      console.log("💻💻💻💻💻Search Result:", searchResult);

      if ((await searchResult).found == false) {
        this.reporter.infoSuccess(
          `Great! No 'pip install --upgrade' found in your Dockerfile at: ${dockerfilePath[0]}`
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
        body: `Your Dockerfile located at ${
          dockerfilePath[0]
        } contains a 'pip install --upgrade' command at line ${
          (
            await searchResult
          ).line
        }. Using '--upgrade' can lead to unpredictable builds and potential compatibility issues. It's recommended to specify exact package versions to ensure consistent and reliable builds. This practice breaches the LR_005_avoidPipUpgrade rule.`,
        labels: ["LR_005_avoidPipUpgrade", "dockerfile", "scan-dockerfile"],
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
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error executing ${this.rule}:`, errorMsg);
      throw new Error(`Failed to execute ${this.rule}: ${errorMsg}`);
    }
  }
}
