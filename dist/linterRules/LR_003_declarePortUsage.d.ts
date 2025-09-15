import { IGitHubActionsAdapter } from "../adapters/githubActionsInterface";
import { githubaActionsReporters } from "../reporters/githubaActionsReporters";
import { ILinterRule } from "../contracts/LR_interface";
export declare class LR_003_declarePortUsage implements ILinterRule {
    private adapter;
    private reporter;
    issueTitle: string;
    rule: string;
    constructor(adapter: IGitHubActionsAdapter, reporter: githubaActionsReporters, // Need to use general ClassReporter
    issueTitle?: string, rule?: string);
    execute(): Promise<void>;
}
