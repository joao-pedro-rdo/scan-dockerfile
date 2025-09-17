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
    execute(): Promise<void>;
    /**
     * Prepara o request para a IA baseado nos resultados do search
     */
    private prepareRefactorRequest;
    private formatIssueBody;
}
