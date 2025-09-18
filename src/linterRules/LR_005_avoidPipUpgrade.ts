import { IGitHubActionsAdapter } from "../contracts/githubActionsInterface";
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
