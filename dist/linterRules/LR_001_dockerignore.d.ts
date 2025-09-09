import { IGitHubActionsAdapter } from "../adapters/githubActionsInterface";
import { IgithubaActionsReporters } from "../adapters/reporterInterfce";
import { ILinterRule } from "./LR_interface";
/**
 * Linter rule LR_001_dockerignore checks if a .dockerignore file exists in the repository.
 * @param {IAdapter} adapter - The GitHub Actions adapter for accessing the workspace.
 * @param {IgithubaActionsReporters} reporter - The reporter for logging and issue creation.
 */
export declare class LR_001_dockerignore implements ILinterRule {
    private adapter;
    private reporter;
    issueTitle: string;
    rule: string;
    constructor(adapter: IGitHubActionsAdapter, reporter: IgithubaActionsReporters, // Need to use general ClassReporter
    issueTitle?: string, rule?: string);
    /**
     * This method checks for the presence of a .dockerignore file in the repository.
     * If not found, it creates a GitHub issue recommending adding one.
     * This method uses a file finder utility to search for the .dockerignore file automatically.
     * @returns {Promise<void>} - A promise that resolves when the check is complete.
     */
    execute(): Promise<void>;
}
