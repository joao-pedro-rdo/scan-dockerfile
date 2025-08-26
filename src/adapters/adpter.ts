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
