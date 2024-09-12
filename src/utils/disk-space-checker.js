const diskSpaceInspector = require('check-disk-space').default;
const config = require('../configs/config.json');
const { minimumPercentage, round, bits, toGB } = config.variables;

module.exports = checkDiskSpace = async () => {
    // Flag to track if there is enough disk space
    let isEnoughSpace = true;

    try {
        logger.info('Checking disk space...');

        // Retrieving disk space information for the current directory (or use: config.paths.outputDriver if needed)
        const diskSpace = await diskSpaceInspector(__dirname);

        // Calculating total, free, and minimum required space in gigabytes
        const totalSpaceInGB = (diskSpace.size / (bits ** toGB)).toFixed(round);
        const freeSpaceInGB = (diskSpace.free / (bits ** toGB)).toFixed(round);
        const minimumSpaceInGB = (totalSpaceInGB * minimumPercentage).toFixed(round);

        logger.info('Total space: ' + totalSpaceInGB + ' gb...');
        logger.info('Free space: ' + freeSpaceInGB + ' gb...');
        logger.info('Minimum space needed: ' + minimumSpaceInGB + ' gb...');

        // Checking if free space is less than the minimum required space
        if (Number(freeSpaceInGB) < Number(minimumSpaceInGB)) {
            isEnoughSpace = false;
            throw new Error('Not enough disk space, process terminated.');
        }
    }
    catch (err) {
        if (!isEnoughSpace) {
            // If not enough space, set the process exit code and rethrow the error to stop program
            process.exitCode = 1;
            throw err;
        }
        else {
            logger.error('While checking disck space', err.stack);
        }
    }
}
