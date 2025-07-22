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
        const newIssue = await octokit.rest.issues.create({
            owner: owner,
            repo: repo,
            title: 'Comment from GitHub Action',
            body: 'Comment test from GitHub Action',
        });

        // Obtain the ID of the created comment
        console.log('Comment created successfully:', newIssue.data.title);
        // const commentID = newIssue.data.id;

        core.notice(`Comment created successfully: ${newIssue.data.title}`);

        core.summary
            .addHeading('GitHub Action Summary de teste')
            .addCodeBlock(`Comment created successfully: ${newIssue.data.title}`, 'markdown')
            .addSeparator()
            .addRaw('Teste <br> teste:')
            .addLink('Check the suggestion', 'https://github.com/actions/toolkit');

        await core.summary.write();
        core.notice('The summary has been written successfully.');

    } catch (error) {
        core.setFailed(`Action failed with error: ${error.message}`);
    }
}

run();
