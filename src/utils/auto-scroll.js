const addDelay = require('./delay');
const config = require('../configs/config.json');
const logger = require('./logger');

const delayTime = config.variables.scrollDelay;

// Scroll a web page to the bottom and then back to the top using smooth behavior to ensure the entire page content is loaded.
module.exports = autoScroll = async page => {
    try {
        logger.info('Auto scrolling page...');

        await page.evaluate(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        });

        // Added delay so everything works properly.
        await addDelay(delayTime);

        //  Scroll back to the top of the page, to handle potential issues with sticky elements like menubar what may look weird in the screenshot.
        await page.evaluate(() => {
            window.scrollTo({
                top: screenTop,
                behavior: 'smooth'
            });
        });

        await addDelay(delayTime);
    }
    catch (err) {
        logger.error('Auto scrolling page:', err);
    }
}
