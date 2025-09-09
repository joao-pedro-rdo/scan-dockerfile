export interface ILinterRule {
  issueTitle: string;
  rule: string;
  execute(): Promise<void>;
}
