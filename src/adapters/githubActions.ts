import * as github from "@actions/github";

export class GitHubActionsAdapter {
  // TODO: Verify if need to private
  private token: string;
  public workspace: string;
  public owner: string;
  public repo: string;
  public octokit: any;
  public context: any;

  constructor(token: string, workspace: string) {
    this.token = token;
    this.workspace = workspace;

    this.octokit = github.getOctokit(token);
    this.context = github.context;

    this.owner = this.context.repo.owner;
    this.repo = this.context.repo.repo;
  }

  getOctokit() {
    return this.octokit;
  }
  getContext() {
    return this.context;
  }
  debug() {
    return JSON.stringify({
      owner: this.owner,
      repo: this.repo,
      token: this.token,
      workspace: this.workspace,
    });
  }
}
