import { IAdapter } from "../adapters/githubActionsInterface";
import { IgithubaActionsReporters } from "../adapters/reporterInterfce";
export declare class LR_001_dockerignore {
    private adapter;
    private reporter;
    constructor(adapter: IAdapter, reporter: IgithubaActionsReporters);
    execute(): Promise<void>;
}
