import { GitHubActionsAdapter } from "../adapters/githubActions";
/**
 * Input for {@link PullRequestService.createRefactorPullRequest}.
 *
 * @property baseBranch    Branch the PR targets and is branched from (e.g. "develop").
 * @property newBranch     Branch to create for the fix (e.g. "sentinelci/fix-dockerfile-123").
 * @property filePath      Repo-relative path of the file to overwrite (forward slashes).
 * @property fileContent   New content for that file (the corrected Dockerfile).
 * @property commitMessage Commit message for the single-file commit.
 * @property title         Pull request title.
 * @property body          Pull request description (markdown).
 */
export interface CreatePullRequestInput {
    baseBranch: string;
    newBranch: string;
    filePath: string;
    fileContent: string;
    commitMessage: string;
    title: string;
    body: string;
}
/** Result of a successful pull request creation. */
export interface CreatePullRequestResult {
    number: number;
    html_url: string;
    head: string;
    base: string;
}
/**
 * Creates a pull request that applies the SentinelCI API's corrected Dockerfile,
 * entirely through the GitHub REST API (Octokit) — no local git push required.
 *
 * Flow: resolve base branch head → create a new branch → commit the corrected
 * file on it (Contents API) → open the PR.
 */
export declare class PullRequestService {
    private readonly adapter;
    constructor(adapter: GitHubActionsAdapter);
    createRefactorPullRequest(input: CreatePullRequestInput): Promise<CreatePullRequestResult>;
}
