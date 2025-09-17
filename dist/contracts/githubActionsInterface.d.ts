export interface IAdapter {
    token: string;
    workspace: string;
    debug(): string;
}
export interface IGitHubActionsAdapter extends IAdapter {
    owner: string;
    repo: string;
    octokit: any;
    context: any;
    findOpenIssueByTitle(title: string): Promise<any | null>;
    listIssues(): Promise<any[]>;
}
export interface IGitHubIssue {
    id: number;
    title: string;
    html_url: string;
    body: string;
    number: number;
    state: string;
    labels: any[];
}
