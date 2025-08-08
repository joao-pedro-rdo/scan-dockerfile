export declare class GitHubActionsAdapter {
    private token;
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
