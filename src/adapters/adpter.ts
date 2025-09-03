interface IAdapter {
  //TODO: Validate
  //Define Default Adapter
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

export interface INewIssue {
  title: string;
  body: string;
  labels: string[];
}

export interface INewPR {
  title: string;
  body: string;
  head: string;
}
