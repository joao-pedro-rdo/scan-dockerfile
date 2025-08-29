import { IGitHubActionsAdapter, INewIssue } from "./adpter";
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
    /**
     * Create New Issue
     * @param obj: INewIssue
     */
    newIssue(obj: INewIssue): Promise<void>;
    debug(): string;
}
