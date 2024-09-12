// Centralized location to import all the necessary modules.
const data = {
    consolidateData: require('./consolidate-data.js'),
    extractHtmlAndTxtContent: require('./extract-html-and-text-content.js'),
    generateOutputPaths: require('./generate-output-paths.js'),
};

const imageProcessing = {
    imageListener: require('./image-listener.js'),
    imageResponses: require('./image-responses.js'),
    takeScreenShot: require('./screenshot.js'),
};

const navigation = {
    navigateToUrl: require('./navigate-to-url.js'),
    openNewPage: require('./open-new-page.js'),
};

const utilities = {
    autoScroll: require('./auto-scroll.js'),
    checkDiskSpace: require('./disk-space-checker.js'),
    clickOnElementWithText: require('./cookie-blocker-generic.js'),
    cookieBlocker: require('./cookie-blocker-list.js'),
    delay: require('./delay.js'),
    launchPuppeteer: require('./puppeteer-launcher.js'),
    logger: require('./logger.js'),
    runUpdater: require('./updater.js'),
};

module.exports = {
    data,
    imageProcessing,
    navigation,
    utilities,
};
