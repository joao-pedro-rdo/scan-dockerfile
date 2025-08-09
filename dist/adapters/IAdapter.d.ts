interface IAdapter {
    token: string;
    workspace: string;
    debug(): string;
}
export interface IGitHubActionsAdapter extends IAdapter {
    owner: string;
    repo: string;
    octokit: any;
    context: any;
}
export {};
