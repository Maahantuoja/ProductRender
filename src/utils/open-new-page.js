const config = require('../configs/config.json');
const viewportWidth = config.variables.viewportWidth;
const viewportHeight = config.variables.viewportHeight;
const timeOutDelay = config.variables.timeOutDelay;
const sliceAmount = config.variables.sliceAmount;

module.exports = openNewPage = async browser => {
    try {
        logger.info('Opening new page...');

        // Creating a new page using the provided browser instance
        const page = await browser.newPage();

        // Setting the viewport dimensions for the page
        // Most common 1920x1080 & 1366x768
        await page.setViewport({
            width: viewportWidth,
            height: viewportHeight,
        });

        await page.setDefaultNavigationTimeout(timeOutDelay);

        return page;
    }
    catch (err) {
        logger.error('Opening new page:', err.stack.slice(sliceAmount));
    }
}