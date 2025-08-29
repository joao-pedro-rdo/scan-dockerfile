import { IGitHubActionsAdapter, INewIssue, INewPR } from "../adapters/adpter";
const github = require("@actions/github");
interface reporter {}

/**
 * Class for reporting GitHub Actions events.
 */
export class ClassReporter implements reporter {
  //  TODO Analise how to implement reporting generic
  private IGitHubActionsAdapter: IGitHubActionsAdapter;

  constructor(adapter: IGitHubActionsAdapter) {
    this.IGitHubActionsAdapter = adapter;
  }

  info() {
    // TODO: Implement info reporting
  }

  summary() {
    // TODO: Implement summary reporting
    // Core summary
  }
  /**
   * Create New Issue
   * @param obj: INewIssue
   * @see {@link https://octokit.github.io/rest.js/ | Octokit.js Documentation}
   */

  async newIssue(obj: INewIssue) {
    // console.log("🤢 Ockotkit: ", this.IGitHubActionsAdapter.octokit);
    await this.IGitHubActionsAdapter.octokit.rest.issues.create({
      owner: this.IGitHubActionsAdapter.owner,
      repo: this.IGitHubActionsAdapter.repo,
      title: obj.title,
      body: obj.body,
      labels: obj.labels,
    });
  }
  /**
   * Create New Pull Request
   * @param obj: INewPR
   */
  async newPr(obj: INewPR) {
    await this.IGitHubActionsAdapter.octokit.rest.pulls.create({
      owner: this.IGitHubActionsAdapter.owner,
      repo: this.IGitHubActionsAdapter.repo,
      title: obj.title,
      body: obj.body,
    });
  }
}
