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

    // if (dockerignoreFiles.length > 0) {
    //   reporter.newIssue({
    //     title: "Dockerignore files found",
    //     body: `The following .dockerignore files were found:\n${dockerignoreFiles.join("\n")}`,
    //     labels: ["dockerfile", "scan-dockerfile"],
    //   });
    // }

    // OU

    // ClassIntermediaria que contem toda logica para fazer essa parda de verificar
    // se tem o dockerignore e assim solicitar a new issue com os dados corretos
    // e abrir as visualização

    reporter.newIssue({
      title: "New Issue Title",
      body: "Description of the new issue",
      labels: ["dockerfile", "scan-dockerfile"],
    });
    console.log("teste of new PR");
  } catch (error) {
    console.log("deu ruim");
  }
}

run();
