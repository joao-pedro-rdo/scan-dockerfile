import { IGitHubActionsAdapter } from "../contracts/githubActionsInterface";
import { githubaActionsReporters } from "../reporters/githubaActionsReporters";
import { ILinterRule } from "../contracts/LR_interface";
import { HeuristicDependenciesOrderImpl } from "../heuristic/heuristic_dependencies_order";
export declare class LR_007_dependencies_order implements ILinterRule {
    private adapter;
    private reporter;
    issueTitle: string;
    rule: string;
    heuristc: HeuristicDependenciesOrderImpl;
    constructor(adapter: IGitHubActionsAdapter, reporter: githubaActionsReporters, // Need to use general ClassReporter
    issueTitle?: string, rule?: string, heuristc?: HeuristicDependenciesOrderImpl);
    execute(name_Dockerfile: string): Promise<any>;
    private verify_order;
    private verify_type;
    private searchDockerfilePath;
    /** Normalize operations to have one source per object, some COPY/ADD can have multiple sources
     * @param obj Array of IResponseAstDockerfile
     * @returns Array of normalized operations
     * @example
     */
    private normalizeOperations;
    classifyOperation(operation: {
        source: string;
        destination: string;
        line: number;
        keyword: string;
    }): string;
}
