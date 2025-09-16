import * as core from "@actions/core";

import { GitHubActionsAdapter } from "./adapters/githubActions";
import { githubaActionsReporters } from "./reporters/githubaActionsReporters";
import { LR_001_dockerignore } from "./linterRules/LR_001_dockerignore";
import { LR_002_setWorkdir } from "./linterRules/LR_002_setWorkdir";
// Initialize the GitHub Actions adapter with the provided token and workspace
async function run() {
  try {
    //TODO Verify if exists dockerfile in the workspace because if not exists, the action dont make sense
    const adapter = new GitHubActionsAdapter(
      core.getInput("GITHUB_TOKEN"),
      process.env.GITHUB_WORKSPACE || process.cwd()
    );
    // TODO: Verify if dockerfile exists in the workspace
    //! If cant search dockerfile in the workspace, the action broken

    const reporter = new githubaActionsReporters(adapter);
    // const listIssue = await adapter.listIssues();
    // console.log("List of issues:", listIssue);

    reporter.startTable();

    console.log("Starting the scan-dockerfile action...");

    console.log("teste of new issue");
    const lr_001 = new LR_001_dockerignore(adapter, reporter);
    await lr_001.execute();

    console.log("teste of LR_002");
    const lr_002 = new LR_002_setWorkdir(adapter, reporter);
    await lr_002.execute();

    console.log("teste of LR_003");
    const { LR_003_declarePortUsage } = await import(
      "./linterRules/LR_003_declarePortUsage"
    );
    const lr_003 = new LR_003_declarePortUsage(adapter, reporter);
    await lr_003.execute();

    console.log("teste of LR_004");
    const { LR_004_user } = await import("./linterRules/LR_004_user"); // Should use file extension .ts
    const lr_004 = new LR_004_user(adapter, reporter);
    await lr_004.execute();

    console.log("teste of LR_005");
    const { LR_005_avoidPipUpgrade } = await import(
      "./linterRules/LR_005_avoidPipUpgrade"
    );
    const lr_005 = new LR_005_avoidPipUpgrade(adapter, reporter);
    await lr_005.execute();

    console.log("Test LangChain refactor");

    const { LangchainService } = await import("./refactor/langChain");
    const API_TOKEN = core.getInput("API_TOKEN");
    if (!API_TOKEN) {
      console.log("API_TOKEN not provided");
      throw new Error("API_TOKEN is required for AI functionality");
    }

    const langchainService = new LangchainService(
      "gemini-1.5-flash",
      0.2,
      1000,
      API_TOKEN
    );
    // const testLLM = langchainService.suggestRefactor({
    //   dockerfileSnippet: "RUN chmod 777 /app/script.sh",
    //   context: "This is a mistake, use 777 permissions on linux, correct it",
    // });

    // console.log("Code:", (await testLLM).code);
    // console.log("Suggestion:", (await testLLM).suggestion);
    // console.log("Explanation:", (await testLLM).explanation);
    // console.log("CONFIDENCE:", (await testLLM).confidence);

    // console.log("REFACTOR SUGGESTION FORMATTED:");
    // console.log(langchainService.formatSuggestion((await testLLM).suggestion));

    console.log("+++++ teste of LR_006");
    const { LR_006_joinRun } = await import("./linterRules/LR_006_joinRun");
    const lr_006 = new LR_006_joinRun(adapter, reporter, langchainService);
    await lr_006.execute();
    reporter.renderTable();
    core.summary.write();
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`❌ Error running the action:`, errorMsg);
    core.setFailed(`Action failed with error: ${errorMsg}`);
  }
}

run();
