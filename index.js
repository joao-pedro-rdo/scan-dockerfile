const github = require('@actions/github');
const core = require('@actions/core');
// const fg = require('fast-glob');
const {
    finderDockerignore
} = require('./func.js');

async function run() {
    try {
        // Get the inputs from the action
        const token = core.getInput('GITHUB_TOKEN');

        const workspace = process.env.GITHUB_WORKSPACE || process.cwd();
        core.info(`Scanning workspace: ${workspace}`);

        const lookdockerignore = await finderDockerignore(workspace);
        console.log('executei o findd');
        console.log('lookdockerignore:', lookdockerignore);

        let result = '';
        if (lookdockerignore) {
            core.info(`Found .dockerignore files: ${lookdockerignore.join(', ')}`);
            result = 'found';
        } else {
            core.info('No .dockerignore files found.');
            result = 'No .dockerignore files found.';
        }



        // Initialize Octokit with the provided token
        const octokit = github.getOctokit(token);

        const context = github.context;
        const { owner, repo } = context.repo;

        // Add a comment to the specified issue or PR
        const newIssue = await octokit.rest.issues.create({
            owner: owner,
            repo: repo,
            title: `🐳 Dockerfile-${result}`,
            body: 'Comment test from GitHub Action',
        });

        // Obtain the ID of the created comment
        console.log('Comment created successfully:', newIssue.data.title);
        // const commentID = newIssue.data.id;

        core.notice(`Comment created successfully: ${newIssue.data.title}`);

        core.summary
            .addHeading('🐳 Dockerfile Scan Results')
            .addCodeBlock(`Comment created successfully: ${newIssue.data.title}`, 'markdown')
            .addSeparator()
            .addRaw(`${result}- dockerfile`)

            // .addLink('Check the suggestion', 'https://github.com/actions/toolkit');
            .addLink('View the Dockerfile', newIssue.data.html_url);

        await core.summary.write();
        core.notice('The summary has been written successfully.');

    } catch (error) {
        core.setFailed(`Action failed with error: ${error.message}`);
    }
}

run();
