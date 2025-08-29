import { IGitHubActionsAdapter, INewPR } from "../adapters/adpter";
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
     * Create New Pull Request
     * @param obj: INewPR
     */
    newPr(obj: INewPR): Promise<void>;
}
export {};
