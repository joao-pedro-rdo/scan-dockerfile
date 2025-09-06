import { IAdapter } from "../adapters/githubActionsInterface";
import { IgithubaActionsReporters } from "../adapters/reporterInterfce";
/**
 * Linter rule LR_001_dockerignore checks if a .dockerignore file exists in the repository.
 * @param {IAdapter} adapter - The GitHub Actions adapter for accessing the workspace.
 * @param {IgithubaActionsReporters} reporter - The reporter for logging and issue creation.
 */
export declare class LR_001_dockerignore {
    private adapter;
    private reporter;
    constructor(adapter: IAdapter, reporter: IgithubaActionsReporters);
    /**
     * This method checks for the presence of a .dockerignore file in the repository.
     * If not found, it creates a GitHub issue recommending adding one.
     * This method uses a file finder utility to search for the .dockerignore file automatically.
     * @returns {Promise<void>} - A promise that resolves when the check is complete.
     */
    execute(): Promise<void>;
}
