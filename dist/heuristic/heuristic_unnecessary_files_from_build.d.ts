export interface heuristicUnnecessaryFilesFromBuild {
    listUnnecessaryFiles: JSON[];
}
/**
 * HeuristicUnnecessaryFilesFromBuild is a heuristic class that analyzes build files and source files
 */
export declare class HeuristicUnnecessaryFilesFromBuild {
    private listUnnecessaryFiles;
    constructor(listUnnecessaryFiles?: JSON[]);
    getListUnnecessaryFiles(): JSON[];
}
