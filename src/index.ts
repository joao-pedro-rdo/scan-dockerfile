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

    const reporter = new githubaActionsReporters(adapter);
    const listIssue = await adapter.listIssues();
    // console.log("List of issues:", listIssue);

    reporter.startTable();

    console.log("Starting the scan-dockerfile action...");

    console.log("teste of new issue");
    const lr_001 = new LR_001_dockerignore(adapter, reporter);
    await lr_001.execute();

    console.log("teste of LR_002");
    const lr_002 = new LR_002_setWorkdir(adapter, reporter);
    await lr_002.execute();

    reporter.renderTable();
    core.summary.write();
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`❌ Error running the action:`, errorMsg);
    core.setFailed(`Action failed with error: ${errorMsg}`);
  }
}

run();
