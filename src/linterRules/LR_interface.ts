export interface ILinterRule {
  //? Where should i put this file interface?
  //? Why i cant use private here?
  //  private adapter: IGitHubActionsAdapter,
  //  private reporter: IgithubaActionsReporters
  issueTitle: string;
  rule: string;
  execute(): Promise<void>;
}
