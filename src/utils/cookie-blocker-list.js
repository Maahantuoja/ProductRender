// Importing the PuppeteerBlocker and fetch library for adblocking functionality.
// The library requires cross-fetch as a dependency to download blocking lists.
const { PuppeteerBlocker } = require('@cliqz/adblocker-puppeteer'); 
const fetch = require('cross-fetch');
const config = require('../configs/config.json');
const sliceAmount = config.variables.sliceAmount;

// A function to block cookie banners using EasyList filter lists rules.
module.exports = cookieBlocker = async page => {
    try {
        logger.info('Setting up cookie blocker...');
        
        // Creating an instance of PuppeteerBlocker with EasyList filter lists.
        const blocker = await PuppeteerBlocker.fromLists(fetch, [
            'https://secure.fanboy.co.nz/fanboy-cookiemonster.txt'
        ]);

        // Enabling blocking for cookie banners on the specified page.
        await blocker.enableBlockingInPage(page);
    }
    catch (err) {
        logger.error('Setting up cookie blocker:', err.stack.slice(sliceAmount))
    }
};
