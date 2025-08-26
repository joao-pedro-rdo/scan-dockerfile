import { IGitHubActionsAdapter } from "./adpter";
export declare class GitHubActionsAdapter implements IGitHubActionsAdapter {
    token: string;
    workspace: string;
    owner: string;
    repo: string;
    octokit: any;
    context: any;
    constructor(token: string, workspace: string);
    getOctokit(): any;
    getContext(): any;
    debug(): string;
}
