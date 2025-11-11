export interface HeuristicDependenciesOrder {
  listRequirement: JSON[];
  listSorces: JSON[];
}

export class HeuristicDependenciesOrderImpl implements HeuristicDependenciesOrder {
  constructor(listRequirement: JSON[], listSorces: JSON[]) {
    this.listRequirement = listRequirement;
    this.listSorces = listSorces;
  }
  listRequirement: JSON[];
  listSorces: JSON[];
}
