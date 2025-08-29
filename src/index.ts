import * as core from "@actions/core";

import { GitHubActionsAdapter } from "./adapters/ClassGithubActions";
import { ClassReporter } from "./reporters/ClassReporters";
import * as utils from "./utils";
// Initialize the GitHub Actions adapter with the provided token and workspace
async function run() {
  try {
    const adapter = new GitHubActionsAdapter(
      core.getInput("GITHUB_TOKEN"),
      process.env.GITHUB_WORKSPACE || process.cwd()
    );
    const reporter = new ClassReporter(adapter);

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

    console.log("----------------🐋🐋🐋🐋🐋🐋--------------");
    console.log("Verifying permissions...");
    console.log("Permissions verified:", await adapter.verifyPermissions());

    console.log("----------------🐋🐋🐋🐋🐋🐋--------------");
    console.log("Teste issue and PR");
    console.log("test of new issue");
    console.log("something");
    reporter.newIssue({
      title: "New Issue Title",
      body: "Description of the new issue",
      labels: ["dockerfile", "scan-dockerfile"],
    });
    console.log("teste of new PR");
    reporter.newPr({
      title: "New Pull Request Title",
      body: "Description of the new pull request",
    });
  } catch (error) {
    console.log("deu ruim");
  }
}

run();
