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
export class PullRequestService {
  constructor(private readonly adapter: GitHubActionsAdapter) {}

  async createRefactorPullRequest(input: CreatePullRequestInput): Promise<CreatePullRequestResult> {
    const octokit = this.adapter.octokit;
    const owner = this.adapter.owner;
    const repo = this.adapter.repo;

    // 1. Resolve the base branch head SHA (the branch the PR will target).
    const baseRef = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: `heads/${input.baseBranch}`,
    });
    const baseSha = baseRef.data.object.sha;

    // 2. Create the new branch pointing at the base head. If it already exists
    //    (a re-run with the same name), fast-forward/reset it to the base head.
    try {
      await octokit.rest.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${input.newBranch}`,
        sha: baseSha,
      });
    } catch (error: any) {
      if (error?.status === 422) {
        // Reference already exists — point it back at the base head.
        await octokit.rest.git.updateRef({
          owner,
          repo,
          ref: `heads/${input.newBranch}`,
          sha: baseSha,
          force: true,
        });
      } else {
        throw error;
      }
    }

    // 3. The Contents API needs the current blob SHA to update an existing file.
    //    Fetch it from the new branch; absent (404) means the file is new.
    let fileSha: string | undefined;
    try {
      const existing = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: input.filePath,
        ref: input.newBranch,
      });
      if (!Array.isArray(existing.data) && existing.data?.sha) {
        fileSha = existing.data.sha;
      }
    } catch (error: any) {
      if (error?.status !== 404) {
        throw error;
      }
    }

    // 4. Commit the corrected file to the new branch.
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: input.filePath,
      branch: input.newBranch,
      message: input.commitMessage,
      content: Buffer.from(input.fileContent, "utf8").toString("base64"),
      sha: fileSha,
    });

    // 5. Open the pull request.
    const pr = await octokit.rest.pulls.create({
      owner,
      repo,
      title: input.title,
      body: input.body,
      head: input.newBranch,
      base: input.baseBranch,
    });

    return {
      number: pr.data.number,
      html_url: pr.data.html_url,
      head: input.newBranch,
      base: input.baseBranch,
    };
  }
}
