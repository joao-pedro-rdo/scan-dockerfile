import { IGitHubActionsAdapter } from "../contracts/githubActionsInterface";
import { githubaActionsReporters } from "../reporters/githubaActionsReporters";
import { ILinterRule } from "../contracts/LR_interface";
import { LangchainService } from "../refactor/langChain";
export declare class LR_006_joinRun implements ILinterRule {
    private adapter;
    private reporter;
    private iaService;
    issueTitle: string;
    rule: string;
    constructor(adapter: IGitHubActionsAdapter, reporter: githubaActionsReporters, iaService: LangchainService, issueTitle?: string, rule?: string);
    private searchDockerfilePath;
    /** Check if the Dockerfile contains a WORKDIR instruction.
     * If not, create a GitHub issue recommending adding a WORKDIR instruction.
     * This method uses the AdapterDockerfileAST to parse and analyze the Dockerfile.
     * And search your Dockerfile automatically
     * @returns {Promise<void>} - A promise that resolves when the check is complete.
     * @param name_Dockerfile - Name of the Dockerfile to search for
     */
    execute(name_Dockerfile: string): Promise<void>;
    /**
     * Prepara o request para a IA baseado nos resultados do search
     */
    private prepareRefactorRequest;
    private formatIssueBody;
}
