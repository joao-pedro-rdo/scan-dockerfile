export interface heuristicUnnecessaryFilesFromBuild {
  listUnnecessaryFiles: JSON[];
}

/**
 * HeuristicUnnecessaryFilesFromBuild is a heuristic class that analyzes build files and source files
 */
export class HeuristicUnnecessaryFilesFromBuild {
  constructor(private listUnnecessaryFiles: JSON[] = []) {}

  getListUnnecessaryFiles(): JSON[] {
    return this.listUnnecessaryFiles;
  }
}
