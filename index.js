const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
    try {
        // Get the inputs from the action
        const token = core.getInput('GITHUB_TOKEN');


        // Initialize Octokit with the provided token
        const octokit = github.getOctokit(token);

        const context = github.context;
        const { owner, repo } = context.repo;

        // Add a comment to the specified issue or PR
        const response = await octokit.rest.issues.createComment({
            owner: owner,
            repo: repo,
            title: 'Comment from GitHub Action',
            body: 'Comment test from GitHub Action',
        });

        // Obtain the ID of the created comment
        console.log('Comment created successfully:', response.data.title);
        // const commentID = response.data.id;

        core.setOutput('COMMENT_TITLE', response.data.title);
        core.notice(`Comment created successfully: ${response.data.title}`);
        core.info(`Comment ID: ${response.data.id}`);

    } catch (error) {
        core.setFailed(`Action failed with error: ${error.message}`);
    }
}

run();
