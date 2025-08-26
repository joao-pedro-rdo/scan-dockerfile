import { IGitHubActionsAdapter } from "../adapters/adpter";

interface reporter {}

/**
 * Class for reporting GitHub Actions events.
 */
class ClassReporter implements reporter {
  //  TODO Analise how to implement reporting generic
  private IGitHubActionsAdapter: IGitHubActionsAdapter;

  constructor(adapter: IGitHubActionsAdapter) {
    this.IGitHubActionsAdapter = adapter;
  }

  consoleLog() {
    // TODO: Implement console logging
  }

  notice() {
    // TODO: Implement notice reporting
  }
  info() {
    // TODO: Implement info reporting
  }

  summary() {
    // TODO: Implement summary reporting
    // Core summary
  }

  newIssue() {
    // TODO: Implement new issue reporting
  }

  newPr() {
    // TODO: Implement new pull request reporting
  }
}
