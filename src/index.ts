import * as core from "@actions/core";

import { GitHubActionsAdapter } from "./adapters/githubActions";
import * as utils from "./utils";
// Initialize the GitHub Actions adapter with the provided token and workspace
async function run() {
  try {
    const adapter = new GitHubActionsAdapter(
      core.getInput("GITHUB_TOKEN"),
      process.env.GITHUB_WORKSPACE || process.cwd()
    );

    // * Func to search for .dockerignore files
    const dockerignoreFiles = await utils.finder({
      dir: adapter.workspace,
      file: ".dockerignore",
      ignore: ["node_modules/**"],
      onlyFiles: true,
    });

    console.log("Found .dockerignore files:", dockerignoreFiles);

    utils.listDirectory(adapter.workspace);
    utils.showDirectoryListing(adapter.workspace);

    console.log(adapter.debug());
  } catch (error) {
    console.log("deu ruim");
  }
}

run();
