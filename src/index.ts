import * as core from "@actions/core";

import { GitHubActionsAdapter } from "./adapters/githubActions";

// Initialize the GitHub Actions adapter with the provided token and workspace
async function run() {
  try {
    const adapter = new GitHubActionsAdapter(
      core.getInput("GITHUB_TOKEN"),
      process.env.GITHUB_WORKSPACE || process.cwd()
    );

    core.info(adapter.debug());
    core.debug(adapter.debug());
    core.notice(adapter.debug());
  } catch (error) {
    core.info("deu ruim");
  }
}

run();
