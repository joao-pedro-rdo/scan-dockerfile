import { addLinkIssue, INewIssue, INewPR, ISummary } from "../adapters/reporterInterfce";
import { IgithubaActionsReporters } from "../adapters/reporterInterfce";
import { IGitHubActionsAdapter, IGitHubIssue } from "../adapters/githubActionsInterface";
/**
 * Class for reporting GitHub Actions events.
 */
export declare class githubaActionsReporters implements IgithubaActionsReporters {
    IGitHubActionsAdapter: IGitHubActionsAdapter;
    private tableRows;
    constructor(adapter: IGitHubActionsAdapter);
    addDebug?(msg: string): void;
    /**
     * Log a success message (green).
     * @param text The message to log.
     */
    infoSuccess(text: string): void;
    /**
     * Log a warning message (yellow).
     * @param text The message to log.
     */
    infoWarning(text: string): void;
    /**
     * Log an error message (red).
     * @param text The message to log.
     */
    infoError(text: string): void;
    /**
     * Log an informational message (default color).
     * @param text The message to log.
     */
    info(text: string): void;
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
    /**
     * Create a new issue if one with the same title does not already exist.
     * @param obj: INewIssue
     * @returns obj: IGithubIssue, or null if an error occurs.
     */
    newIssueIfNotExists(obj: INewIssue): Promise<IGitHubIssue | null>;
    createSummary(): Promise<void>;
    startTable(): void;
    addTableRow(rule: string, status: string, details: string, link: string): void;
    renderTable(): void;
}
