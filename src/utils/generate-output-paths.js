// Import required modules
const fs = require('fs').promises;
const path = require('path');

// Load configuration and custom modules
const config = require('../configs/config.json');
const logger = require('./logger');

// Extract relevant configuration values
const output = config.paths.outputFolder;
const sliceAmount = config.variables.sliceAmount;

// Export a function to generate output paths based on a given URL
module.exports = generateOutputPaths = async (url) => {
    // Construct paths for output folders
    const outputFolder = path.join(__dirname, output, path.basename(url));
    const imageOutput = path.join(outputFolder, config.paths.outputImages);
    const dataOutput = path.join(outputFolder, config.paths.outputData);

    try {
        logger.info('Checking output paths...');

        // Ensure the existence of output folders, creating them if necessary
        await fs.mkdir(outputFolder, { recursive: true });
        await fs.mkdir(imageOutput, { recursive: true });
        await fs.mkdir(dataOutput, { recursive: true });
    }
    catch (err) {
        logger.error('Checking output paths:', err.stack.slice(sliceAmount));
    }

    // Return the generated output paths
    return { outputFolder, imageOutput, dataOutput };
};
