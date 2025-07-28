const fg = require('fast-glob');
const path = require('path');
const core = require('@actions/core');

// TODO: Verify if .dockerfile need improve
const finderDockerignore = async (dir) => {
    try {
        const scan = await fg('**/.dockerignore', {
            cwd: dir,
            ignore: ['node_modules/**', 'dist/**', 'build/**'], //TODO: Add more ignores if needed
            onlyFiles: true, // Only return files
        });

        return scan.map(file => path.join(dir, file));

    } catch (error) {
        console.error('Error finding .dockerignore files:', error);
        core.notice('Error finding .dockerignore files:', error);
        core.debug(`Error finding .dockerignore files`);
        return null;
    }
}

module.exports = {
    finderDockerignore
}
