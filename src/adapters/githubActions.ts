import * as github from "@actions/github";
import { IGitHubActionsAdapter, IGitHubIssue } from "./githubActionsInterface";

export class GitHubActionsAdapter implements IGitHubActionsAdapter {
  // TODO: Verify if need to private
  public token: string; //? I Think this should be private but Interface does not allow
  public workspace: string;
  public owner: string;
  public repo: string;
  public octokit: any;
  public context: any;

  constructor(token: string, workspace: string) {
    this.token = token;
    this.workspace = workspace;
    this.octokit = github.getOctokit(token);
    this.context = github.context; //? where is coming from
    this.owner = this.context.repo.owner;
    this.repo = this.context.repo.repo;
  }

  getOctokit() {
    return this.octokit;
  }
  getContext() {
    return this.context;
  }
  async verifyPermissions() {
    try {
      const { data } = await this.octokit.rest.repos.get({
        owner: this.owner,
        repo: this.repo,
      });
      return data;
    } catch (error) {
      console.error("Error verifying permissions:", error);
      throw error;
    }
  }

  async checkPermissions() {
    try {
      return await this.octokit.rest.actions.getGithubActionsDefaultWorkflowPermissionsRepository(
        {
          owner: this.owner,
          repo: this.repo,
        }
      );
    } catch (error) {
      console.error(`Erro ao verificar as permissões:`);
      return [];
    }
  }

  debug() {
    return JSON.stringify({
      owner: this.owner,
      repo: this.repo,
      token: this.token,
      workspace: this.workspace,
    });
  }

  async listIssues() {
    const issues = await this.octokit.rest.issues.listForRepo({
      owner: this.owner,
      repo: this.repo,
      state: "open",
      per_page: 100,
    });
    return issues.data;
  }

  async findOpenIssueByTitle(title: string): Promise<IGitHubIssue | null> {
    try {
      const issues = await this.listIssues();
      const found = issues.find(
        (issue: IGitHubIssue) => issue.title === title && issue.state === "open"
      );
      if (!found) return null;
      return {
        id: found.id,
        number: found.number,
        title: found.title,
        html_url: found.html_url,
        body: found.body,
        state: found.state,
        labels: found.labels,
      };
    } catch (error) {
      console.error("Error finding open issue by title:", error);
      throw error;
    }
  }
}
