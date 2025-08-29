import { IGitHubActionsAdapter, INewIssue, INewPR } from "../adapters/adpter";

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
   */
  newIssue(obj: INewIssue) {
    this.IGitHubActionsAdapter.octokit.issues.create({
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
  newPr(obj: INewPR) {
    this.IGitHubActionsAdapter.octokit.pulls.create({
      owner: this.IGitHubActionsAdapter.owner,
      repo: this.IGitHubActionsAdapter.repo,
      title: obj.title,
      body: obj.body,
    });
  }
}
