export interface HeuristicDependenciesOrder {
    listRequirement: JSON[];
    listSorces: JSON[];
}
export declare class HeuristicDependenciesOrderImpl implements HeuristicDependenciesOrder {
    constructor(listRequirement: JSON[], listSorces: JSON[]);
    listRequirement: JSON[];
    listSorces: JSON[];
}
