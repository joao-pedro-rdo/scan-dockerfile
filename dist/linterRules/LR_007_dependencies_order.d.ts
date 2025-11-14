import { IGitHubActionsAdapter } from "../contracts/githubActionsInterface";
import { githubaActionsReporters } from "../reporters/githubaActionsReporters";
import { ILinterRule } from "../contracts/LR_interface";
import { IResponseAstDockerfile } from "../refactor/dockerfileAST";
export declare class LR_007_dependencies_order implements ILinterRule {
    private adapter;
    private reporter;
    issueTitle: string;
    rule: string;
    constructor(adapter: IGitHubActionsAdapter, reporter: githubaActionsReporters, // Need to use general ClassReporter
    issueTitle?: string, rule?: string);
    private searchDockerfilePath;
    /** Normalize operations to have one source per object, some COPY/ADD can have multiple sources
     * @param obj Array of IResponseAstDockerfile
     * @returns Array of normalized operations
     * @example
     */
    private normalizeOperations;
    verify_type(obj: Array<IResponseAstDockerfile>): Promise<void>;
    execute(name_Dockerfile: string): Promise<any>;
}
