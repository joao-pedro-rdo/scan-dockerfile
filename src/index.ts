import * as core from "@actions/core";

import { GitHubActionsAdapter } from "./adapters/githubActions";
import { githubaActionsReporters } from "./reporters/githubaActionsReporters";
import { LR_001_dockerignore } from "./linterRules/LR_001_dockerignore";
// Initialize the GitHub Actions adapter with the provided token and workspace
async function run() {
  try {
    const adapter = new GitHubActionsAdapter(
      core.getInput("GITHUB_TOKEN"),
      process.env.GITHUB_WORKSPACE || process.cwd()
    );
    const reporter = new githubaActionsReporters(adapter);
    console.log("teste of new issue");
    const lr_001 = new LR_001_dockerignore(adapter, reporter);
    await lr_001.execute();
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`❌ Error running the action:`, errorMsg);
    core.setFailed(`Action failed with error: ${errorMsg}`);
  }
}

run();
