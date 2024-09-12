const modules = require('./utils/my-modules.js');
const config = require('./configs/config.json');

const listOfUrls = config.webPages;
const mode = config.utils.updater.autoUpdate;
const sliceAmount = config.variables.sliceAmount;

async function loadPage() {
    try {
        logger.info('Program started...');

        // Perform initial checks and updates
        await checkDiskSpace();
        await runUpdater(mode);

        const browser = await launchPuppeteer();

        // Loop through each URL in the configuration
        for (const url of listOfUrls) {
            const { imageOutput, dataOutput } = await generateOutputPaths(url);

            const page = await openNewPage(browser);
            const imgResponses = await imageListener(page);

            await cookieBlocker(page);
            await navigateToUrl(page, url);

            /* Custom handler for sites that aren't covered by @duckduckgo/autoconsent and @cliqz/adblocker-puppeteer (yes it handles cookie popups as well), handle other popups too. */
            await clickOnElementWithText(page);

            const capturedImageURLs = await imageResponses(imgResponses, imageOutput);
            const txtAndHtmlContent = await extractHtmlAndTxtContent(page, dataOutput);

            // Solves problem with lazy-loaded pages.
            await autoScroll(page);

            const screenshotPath = await takeScreenShot(page, url, imageOutput);

            await consolidateData(screenshotPath, capturedImageURLs, txtAndHtmlContent, dataOutput);
            await page.close();
        }

        await browser.close();
        logger.info('Program finished.');
    }
    catch (err) {
        logger.error(err.stack.slice(sliceAmount));
    }
}

loadPage();
