import {
  addLinkIssue,
  IGitHubActionsAdapter,
  INewIssue,
  INewPR,
  ISummary,
} from "../adapters/adpter";
const github = require("@actions/github");
const core = require("@actions/core");
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
  /**
   * Report summary information, this method make summary with default format for my scan-dockefile.
   * @param obj: ISummary
   * @see {@link https://github.com/actions/toolkit/tree/main/packages/core | Core Toolkit Documentation}
   */
  summary(obj: ISummary) {
    core.summary.addHeading(`${obj.title}`, "2");
    core.summary.addParagraph(`${obj.summary}`);
  }

  addLinkIssue(obj: addLinkIssue) {
    core.summary.addLink(`${obj.text}`, `${obj.link}`);
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
  //TODO implement new PR is not working
  async newPr(obj: INewPR) {
    await this.IGitHubActionsAdapter.octokit.rest.pulls.create({
      owner: this.IGitHubActionsAdapter.owner,
      repo: this.IGitHubActionsAdapter.repo,
      title: obj.title,
      body: obj.body,
      head: obj.head,
    });
  }
}
