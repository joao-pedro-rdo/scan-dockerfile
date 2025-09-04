import { IGitHubActionsAdapter } from "./githubActionsInterface";
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
    verifyPermissions(): Promise<any>;
    checkPermissions(): Promise<any>;
    debug(): string;
}
