import { addLinkIssue, IGitHubActionsAdapter, INewIssue, INewPR, ISummary } from "../adapters/adpter";
interface reporter {
}
/**
 * Class for reporting GitHub Actions events.
 */
export declare class ClassReporter implements reporter {
    private IGitHubActionsAdapter;
    constructor(adapter: IGitHubActionsAdapter);
    info(): void;
    /**
     * Report summary information, this method make summary with default format for my scan-dockefile.
     * @param obj: ISummary
     * @see {@link https://github.com/actions/toolkit/tree/main/packages/core | Core Toolkit Documentation}
     */
    summary(obj: ISummary): void;
    addLinkIssue(obj: addLinkIssue): void;
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
