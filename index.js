const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
    try {
        // Get the inputs from the action
        const token = core.getInput('GITHUB_TOKEN');
        const issueID = core.getInput('ISSUE_ID');
        const comment = core.getInput('');
        // Initialize Octokit with the provided token
        const octokit = github.getOctokit(token);

        const context = github.context;
        const { owner, repo } = context.repo;

        // Add a comment to the specified issue or PR
        const response = await octokit.rest.issues.createComment({
            owner: owner,
            repo: repo,
            issue_number: issueID,
            body: comment,
        });

        // Obtain the ID of the created comment
        const commentID = response.data.id;

        // Set the output with the comment ID
        core.setOutput('COMMENT_ID', commentID);
        console.log(`Comment added with ID: ${commentID}`);

    } catch (error) {
        console.error(`Error adding comment: ${error.message}`);
        core.setFailed(`Action failed with error: ${error.message}`);
    }
}   
