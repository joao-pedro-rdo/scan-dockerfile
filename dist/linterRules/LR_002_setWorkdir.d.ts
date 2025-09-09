import { GitHubActionsAdapter } from "../adapters/githubActions";
import { githubaActionsReporters } from "../reporters/githubaActionsReporters";
import { ILinterRule } from "./LR_interface";
/**
 * Linter rule LR_002_setWorkdir checks if a Dockerfile contains a WORKDIR instruction.
 * @param {GitHubActionsAdapter} adapter - The GitHub Actions adapter for accessing the workspace.
 * @param {githubaActionsReporters} reporter - The reporter for logging and issue creation.
 */
export declare class LR_002_setWorkdir implements ILinterRule {
    private adapter;
    private reporter;
    issueTitle: string;
    constructor(adapter: GitHubActionsAdapter, reporter: githubaActionsReporters, // Need to use general ClassReporter
    issueTitle?: string);
    /** Check if the Dockerfile contains a WORKDIR instruction.
     * If not, create a GitHub issue recommending adding a WORKDIR instruction.
     * This method uses the AdapterDockerfileAST to parse and analyze the Dockerfile.
     * And search your Dockerfile automatically
     * @returns {Promise<void>} - A promise that resolves when the check is complete.
     */
    execute(): Promise<void>;
}
