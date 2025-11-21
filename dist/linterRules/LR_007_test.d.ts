import { IGitHubActionsAdapter } from "../contracts/githubActionsInterface";
import { githubaActionsReporters } from "../reporters/githubaActionsReporters";
import { HeuristicDependenciesOrderImpl } from "../heuristic/heuristic_dependencies_order";
import { LangchainServiceTestLLM } from "../refactor/langChainTesteLLM";
export declare class LR_007_test {
    private adapter;
    private reporter;
    private iaService;
    issueTitle: string;
    rule: string;
    heuristc: HeuristicDependenciesOrderImpl;
    constructor(adapter: IGitHubActionsAdapter, reporter: githubaActionsReporters, // Need to use general ClassReporter
    iaService: LangchainServiceTestLLM, issueTitle?: string, rule?: string, heuristc?: HeuristicDependenciesOrderImpl);
    execute(name_Dockerfile: string): Promise<any>;
    private formatIssueBody;
    /**
     *  Prepare the context and promptrefactor request for the IA
     * @param searchResult
     * @param dockerfileContent
     * @param operations
     * @returns RefactorRequest {context: string}
     */
    private prepareRefactorRequest;
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
