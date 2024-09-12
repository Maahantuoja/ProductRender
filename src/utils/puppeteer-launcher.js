const puppeteer = require('puppeteer');
const path = require('path');
const config = require('../configs/config.json');

const mode = config.variables.puppeteerMode;
const addon = config.paths.addon;
const sliceAmount = config.variables.sliceAmount;

module.exports = launchPuppeteer = async () => {
    try {
        logger.info('Launching puppeteer...');

        // Launching puppeteer and setting up @duckduckgo autoconsent libraries.
        const extensionPath = path.join(__dirname, addon);
        const browser = await puppeteer.launch({     
            headless: mode,    // Use "new" or false for debugging
            // devtools: true, // Uncomment for debugging
            // slowMo: 250,    // Uncomment for slow-motion debugging
            args: [
                `--disable-extensions-except=${extensionPath}`,
                `--load-extension=${extensionPath}`
            ]
        });
        
        return browser;
    }
    catch(err) {
        logger.error('Launching puppeteer:', err.stack.slice(sliceAmount));
    }
}