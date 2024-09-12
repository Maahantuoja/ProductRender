const util = require('util');
const semver = require('semver');
const config = require('../configs/config.json');

const outdated = config.utils.updater.cmdOutdated;
const update = config.utils.updater.cmdUpdate;

// Promisify the 'exec' function from 'child_process' module
const execPromise = util.promisify(require('child_process').exec);

// Function to run a command asynchronously
async function runCommand(command) {
    try {
        const stdout = await execPromise(command);
        return stdout;
    } catch (error) {
        if (error.code === 1) {
            // npm outdated found outdated packages, this is not an error
            return error.stdout;
        } else {
            // Log and re-throw other error
            logger.error('Error running ' + command + ':\n' + error);
            throw error;
        }
    }
}

// Function to check for updates and update packages if necessary
async function checkUpdates() {
    try {
        logger.info('Checking updates...');
        const outdatedCode = await runCommand(outdated);

        if (outdatedCode) {
            const packages = JSON.parse(outdatedCode);
            const package = Object.keys(packages)[0];

            if (package) {
                const currentVersion = packages[package].current;
                const wantedVersion = packages[package].wanted;
                const compare = semver.compare(currentVersion, wantedVersion);

                // Update packages if the wanted version is greater than the current version
                if (compare === -1) {
                    logger.info('Updating...');
                    await runCommand(update);
                    logger.info('Packages are up to date...');
                } else {
                    logger.info('Packages are up to date...');
                }
            }
        }
    } catch (error) {
        logger.error('Error checking updates:', error);
    }
}

// Export the updater function, which optionally runs the update check based on the 'mode' parameter
module.exports = runUpdater = async mode => {
    if (mode) {
        await checkUpdates().catch(logger.error);
    }
};
