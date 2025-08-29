import * as github from "@actions/github";
import { IGitHubActionsAdapter, INewIssue } from "./adpter";

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
      // Fazemos uma chamada leve para a API, como obter informações do repositório.
      // O endpoint não importa tanto quanto o fato de que a chamada será autenticada.
      const response = await this.octokit.rest.repos.get({
        owner: this.owner,
        repo: this.repo,
      });

      // O header 'x-oauth-scopes' contém as permissões concedidas ao token.
      const scopesHeader = response.headers["x-oauth-scopes"];
      if (!scopesHeader) {
        console.log(
          "Não foi possível encontrar o header de escopos (x-oauth-scopes). As permissões podem ser mínimas."
        );
        return [];
      }

      const scopes = scopesHeader.split(",").map((s: string) => s.trim());
      console.log(
        `Permissões encontradas para este token: [${scopes.join(", ")}]`
      );

      return scopes;
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
}
