const path = require('path');
const config = require('../configs/config.json');

module.exports = takeScreenShot = async (page, url, imageOutput) => {
    try {
        logger.info('Taking screenshot...');

        // Generate a filename for the screenshot based on the URL
        const filename = 'www.' + path.basename(url) + '.png' || 'screenshot.png';

        // Set the full path where the screenshot will be saved
        const savePath = path.join(imageOutput, filename);

        // Get current page dimensions using browser evaluation
        const dimensions = await page.evaluate(() => {
            return {
                width: document.documentElement.clientWidth,
                height: document.body.scrollHeight,
            };
        });

        // Configure screenshotOptions using dynamic dimensions
        const screenshotOptions = {
            path: savePath,
            clip: {
                x: 0, // Starting point
                y: 0, // Starting point
                width: dimensions.width,
                height: dimensions.height,
            },
        };

        // Take a screenshot using specified settings
        await page.screenshot(screenshotOptions);

        // Return the path where the screenshot was saved
        return screenshotPath = savePath;
    }
    catch (err) {
        logger.error('Taking screenshot', err);
    }
}