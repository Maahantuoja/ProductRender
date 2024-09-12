const config = require('../configs/config.json');
const logger = require('./logger');

const { cookieTextPatterns, otherTextPatterns, selectors } = config.patterns;
const { cookieSelector, customSelector, defaultSelector } = config.selectors;

// A custom, but generic logic for every site
module.exports = clickOnElementWithText = async page => {
    try {
        logger.info('Trying click cookies...');

        // Wait for selectors related to cookies and other popups to be visible or for network idle before proceed.
        await Promise.race([
            page.waitForSelector(cookieSelector, { visible: true }),
            page.waitForSelector(customSelector, { visible: true }),
            page.waitForNetworkIdle({ idleTime: 5000 }),
        ]);

        // Evaluate JavaScript in the context of the page to perform the click operation.
        await page.evaluate((cookieTextPatterns, otherTextPatterns, cookieSelector, customSelector, defaultSelector) => {
            const combinedTextPattern = new RegExp(cookieTextPatterns + '|' + otherTextPatterns, 'gi');

            // Function to click on elements with specified selectors that contain the expected text.
            const clickAccept = async selectors => {
                for (const selector of selectors) {
                    const elements = document.querySelectorAll(selector);
                    for (const element of elements) {
                        if (element.textContent.trim().match(combinedTextPattern)) {
                            element.click();
                            return true;
                        }
                    }
                }
                return false;
            };

            // Attempt to click on elements with specific selectors related to cookies and other popups for example language, region or newsletter popups, if no elements were found, attempt to click on any 'a' or 'button' element.
            if (clickAccept([cookieSelector, customSelector, defaultSelector])) {
                return true;
            }
        },
            cookieTextPatterns,
            otherTextPatterns,
            cookieSelector,
            customSelector,
            defaultSelector,
        );

        // Wait for selectors to be invisible or for network idle after a specified duration or navigation before proceed.
        await Promise.race([
            page.waitForSelector(cookieSelector, { visible: false }),
            page.waitForSelector(customSelector, { visible: false }),
            page.waitForNetworkIdle({ idleTime: 5000 }),
            page.waitForNavigation(),
        ]);
    }
    catch (err) {
        logger.error('While trying to click cookies: ' + err.stack);
        return false;
    }
}
