export interface ILinterRule {
  issueTitle: string;
  execute(): Promise<void>;
}
