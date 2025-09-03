import { IGitHubActionsAdapter, INewIssue, INewPR } from "../adapters/adpter";
interface reporter {
}
/**
 * Class for reporting GitHub Actions events.
 */
export declare class ClassReporter implements reporter {
    private IGitHubActionsAdapter;
    constructor(adapter: IGitHubActionsAdapter);
    info(): void;
    summary(): void;
    /**
     * Create New Issue
     * @param obj: INewIssue
     * @see {@link https://octokit.github.io/rest.js/ | Octokit.js Documentation}
     */
    newIssue(obj: INewIssue): Promise<void>;
    /**
     * Create New Pull Request
     * @param obj: INewPR
     */
    newPr(obj: INewPR): Promise<void>;
}
export {};
