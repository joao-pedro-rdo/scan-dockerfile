import { GitHubActionsAdapter } from "../adapters/githubActions";
import { ClassReporter } from "../reporters/githubaActionsReporters";

export class LR_002_setWorkdir {
  constructor(
    private adapter: GitHubActionsAdapter,
    private reporter: ClassReporter // Need to use general ClassReporter
  ) {}

  async execute() {
    // Implementation of the execute method
  }
}
