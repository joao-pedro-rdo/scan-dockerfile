import { GitHubActionsAdapter } from "../adapters/githubActions";
import { githubaActionsReporters } from "../reporters/githubaActionsReporters";
export declare class LR_002_setWorkdir {
    private adapter;
    private reporter;
    constructor(adapter: GitHubActionsAdapter, reporter: githubaActionsReporters);
    execute(): Promise<void>;
}
