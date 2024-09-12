const fs = require('fs').promises;
const path = require('path');
const config = require('../configs/config.json');

const excludedPatterns = config.patterns.excludedPatterns;
const sliceAmount = config.variables.sliceAmount;

module.exports = imageResponses = async (imgResponses, imageOutput) => {
    try {
        logger.info('Collecting image responses...');

        const capturedImageURLs = [];

        // Check if the image URL matches any excluded patterns
        imgResponses.forEach(async (imgResponse) => {
            if (!excludedPatterns.some(pattern => new RegExp(pattern).test(imgResponse.url))) {
                const imageName = path.basename(new URL(imgResponse.url).pathname); 
                const savePath = path.join(imageOutput, imageName);
                capturedImageURLs.push(imgResponse.url); // Separate img urls to own array
                
                await fs.writeFile(savePath, imgResponse.buffer);
            }
        });

        return capturedImageURLs;
    }
    catch (err) {
        logger.error('Collecting image responses:', err.stack.slice(sliceAmount));
    }
}