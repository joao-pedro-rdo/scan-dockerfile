import {
  addLinkIssue,
  INewIssue,
  INewPR,
  ISummary,
} from "../adapters/reporterInterfce";
import {
  IReporter,
  IgithubaActionsReporters,
} from "../adapters/reporterInterfce";
import { IGitHubActionsAdapter } from "../adapters/githubActionsInterface";
import { info } from "console";
const github = require("@actions/github");
const core = require("@actions/core");

/**
 * Class for reporting GitHub Actions events.
 */
export class githubaActionsReporters implements IgithubaActionsReporters {
  //  TODO Analise how to implement reporting generic
  IGitHubActionsAdapter: IGitHubActionsAdapter;

  constructor(adapter: IGitHubActionsAdapter) {
    this.IGitHubActionsAdapter = adapter;
  }
  addDebug?(msg: string): void {
    throw new Error("Method not implemented.");
  }
  /**
   * Log a success message (green).
   * @param text The message to log.
   */
  infoSuccess(text: string) {
    core.info(`\u001b[32m${text}\u001b[0m`);
  }
  /**
   * Log a warning message (yellow).
   * @param text The message to log.
   */
  infoWarning(text: string) {
    core.warning(`\u001b[33m${text}\u001b[0m`);
  }
  /**
   * Log an error message (red).
   * @param text The message to log.
   */
  infoError(text: string) {
    core.error(`\u001b[31m${text}\u001b[0m`);
  }
  /**
   * Log an informational message (default color).
   * @param text The message to log.
   */
  info(text: string) {
    core.info(`${text}`);
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

  async listIssues() {
    const issues =
      await this.IGitHubActionsAdapter.octokit.rest.issues.listForRepo({
        owner: this.IGitHubActionsAdapter.owner,
        repo: this.IGitHubActionsAdapter.repo,
        state: "open",
        per_page: 100,
      });
    return issues.data;
  }
}
