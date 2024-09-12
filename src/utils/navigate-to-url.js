const config = require('../configs/config.json');

module.exports = navigateToUrl = async (page, url) => {
    try {
        logger.info('Loading page...');

        // Using Puppeteer's page.goto() to navigate to the specified URL
        // The options ensure waiting for load, DOMContentLoaded, and network idle before resolving
        await page.goto(url, { waitUntil: ['load', 'domcontentloaded', 'networkidle0'] });
    }
    catch (err) {
        logger.error('Navigate to url', err.stack);
    }
}