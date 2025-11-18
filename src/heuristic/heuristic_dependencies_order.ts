export interface HeuristicDependenciesOrder {
  // listRequirement: any;
  // listSorces: any;
}

export class HeuristicDependenciesOrderImpl implements HeuristicDependenciesOrder {
  constructor() {
    // this.listDependecy = listRequirement;
    // this.listSorces = listSorces;
  }

  listDependecy = [
    "package.json",
    "package*.json",
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    "requirements.txt",
    "requirements/*.txt",
    "Pipfile",
    "Pipfile.lock",
    "go.mod",
    "go.sum",
    "Cargo.toml",
    "Cargo.lock",
    "pom.xml",
    "build.gradle",
    "composer.json",
  ];

  listSorces = [
    ".",
    "./",
    "./*",
    "src",
    "src/",
    "src/*",
    "app",
    "app/",
    "app/*",
    "*.py",
    "*.js",
    "*.ts",
    "*.java",
    "*.go",
  ];
}
