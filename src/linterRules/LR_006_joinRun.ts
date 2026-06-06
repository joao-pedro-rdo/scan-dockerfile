import { IGitHubActionsAdapter } from "../contracts/githubActionsInterface";
import { githubaActionsReporters } from "../reporters/githubaActionsReporters";
import { ILinterRule } from "../contracts/LR_interface";
import { AdapterDockerfileAST, IResponseAstDockerfile } from "../refactor/dockerfileAST";
import { promises as fs } from "fs";
import * as utils from "../utils";
import { LangchainService } from "../refactor/langChain";
import { RefactorRequest, RefactorResponse } from "../contracts/iaServiceInterface";

export class LR_006_joinRun implements ILinterRule {
  constructor(
    private adapter: IGitHubActionsAdapter,
    private reporter: githubaActionsReporters,
    // Optional: when omitted, the rule only DETECTS the violation (and registers
    // the agent id) — the SentinelCI API performs the actual refactoring. The
    // legacy LangChain path is kept for historical comparison (TCC).
    private iaService?: LangchainService,
    public issueTitle: string = "Join RUN commands to reduce layers",
    public rule: string = "LR_006_joinRun"
  ) {}

  //todo i NEDD CONSIDER TROW ERROR
  private async searchDockerfilePath(name_Dockerfile: string): Promise<string[]> {
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
      // if no dockerfile found, throw error
      if (dockerfilePath.length === 0) {
        throw new Error("No Dockerfile found in LR_006_joinRun");
      }
      // Read the content of the Dockerfile
      const dockerfileContent = await fs.readFile(dockerfilePath[0], "utf8");
      const dockerfile = new AdapterDockerfileAST(dockerfileContent);

      // Search for join consecutive RUN instructions
      const searchResult = await dockerfile.searchConsecutiveKeyword({
        keyword: "RUN",
        args: [],
      });

      if (searchResult && searchResult.length > 1) {
        if (!this.iaService) {
          // Detection-only: report the violation so the SentinelCI API selects
          // the lr_006 agent. The API performs the refactoring.
          this.reporter.infoWarning(
            `Found ${searchResult.length} consecutive RUN commands — will be handled by the SentinelCI API.`
          );
          this.reporter.addTableRow({
            rule: this.rule,
            status: "⚠️",
            details: `${searchResult.length} consecutive RUNs found`,
            link: "",
          });
          return;
        }

        // ── Legacy LangChain refactoring path (kept for historical comparison) ──
        const refactorRequest = this.prepareRefactorRequest(searchResult, dockerfileContent);
        const aiSuggestion = await this.iaService.suggestRefactor(refactorRequest);
        console.log("++++++ RETURN IA: ", aiSuggestion.code);
        console.log("++++++ RETURN IA SUGGESTION: ", aiSuggestion.suggestion);
        console.log("++++++ RETURN IA EXPLANATION: ", aiSuggestion.explanation);
        console.log("++++++ RETURN IA CONFIDENCE: ", aiSuggestion.confidence);

        const issueBody = this.formatIssueBody(searchResult, aiSuggestion, dockerfileContent);

        const issue = await this.reporter.newIssueIfNotExists({
          title: this.issueTitle,
          body: issueBody, // ← Aqui usa o body formatado
          labels: ["LR_006_joinRun", "performance", "ai-suggested"],
        });

        if (issue != null) {
          this.reporter.infoWarning(`Issue created: ${issue.html_url}`);

          this.reporter.addTableRow({
            rule: this.rule,
            status: "⚠️",
            details: `${searchResult.length} consecutive RUNs found`,
            link: issue.html_url,
          });
        }
      } else {
        this.reporter.infoSuccess(
          `Great! No consecutive RUN commands found in your Dockerfile at: ${dockerfilePath[0]}`
        );
        this.reporter.addTableRow({
          rule: this.rule,
          status: "✔️",
          details: this.issueTitle,
          link: "",
        });
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error executing LR_006_joinRun:`, errorMsg);
      throw new Error(`Failed to execute LR_006_joinRun : ${errorMsg}`);
    }
  }
  /**
   * Prepara o request para a IA baseado nos resultados do search
   */
  private prepareRefactorRequest(
    searchResult: Array<IResponseAstDockerfile>,
    dockerfileContent: string
  ): RefactorRequest {
    const problematicLines = searchResult.map((result) => {
      const command = result.keyword.join(" ");
      const args = result.args.join(" ");
      const lineNumber = result.line[0];

      return {
        line: lineNumber,
        content: `${command} ${args}`.trim(),
      };
    });

    const dockerfileSnippet = problematicLines
      .map((item) => `Line ${item.line}: ${item.content}`)
      .join("\n");

    const context = `

      PROBLEM: Found ${searchResult.length} consecutive RUN commands that could be optimized.

      AFFECTED LINES: ${problematicLines.map((l) => l.line).join(", ")}

      SUGGESTION: Combine these RUN commands into a single command to reduce Docker layers and improve build performance.

      FULL DOCKERFILE CONTEXT:
      ${dockerfileContent}

      SPECIFIC COMMANDS TO OPTIMIZE:
      ${problematicLines.map((l) => `Line ${l.line}: ${l.content}`).join("\n")}
          `.trim();

    console.log("📧Context prepared for AI:", context);
    return {
      dockerfileSnippet,
      context,
      // ruleType: "performance",
    };
  }

  private formatIssueBody(
    searchResult: any[],
    aiSuggestion: RefactorResponse,
    dockerfileContent: string
  ): string {
    const problematicLines = searchResult.map((result) => {
      const command = result.keyword.join(" ");
      const args = result.args.join(" ");
      const lineNumber = result.line[0];
      return { line: lineNumber, content: `${command} ${args}`.trim() };
    });

    return `## 🐳 ${this.issueTitle}

### 📍 **Issue Found:**
Found **${
      searchResult.length
    }** consecutive RUN commands that can be optimized to reduce Docker layers.

### 🔍 **Affected Lines:**
${problematicLines.map((l) => `- **Line ${l.line}:** \`${l.content}\``).join("\n")}

### 🤖 **AI Suggestion (Confidence: ${(aiSuggestion.confidence * 100).toFixed(1)}%):**

**Recommended Fix:**
\`\`\`dockerfile
${aiSuggestion.code}
\`\`\`

**Explanation:**
${aiSuggestion.explanation}

**Why this matters:**
${aiSuggestion.suggestion}

### 🔧 **How to Fix:**
1. Replace the consecutive RUN commands with the suggested optimized version
2. Test your Docker build to ensure functionality remains intact

---
*This issue was automatically detected by our Dockerfile linter and enhanced with AI suggestions.*`;
  }
}
