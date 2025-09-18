export interface ILinterRule {
    issueTitle: string;
    rule: string;
    execute(name_Dockerfile?: string): Promise<void>;
}
