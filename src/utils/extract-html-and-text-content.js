const fs = require('fs').promises;
const path = require('path');
const config = require('../configs/config.json');

module.exports = extractHtmlAndTxtContent = async (page, dataOutput) => {
    try {
        logger.info('Extracting html & text content...');

        // Get HTML content from the page
        const htmlContent = await page.content();

        // Get text content from the page using client-side JavaScript
        const textContent = await page.evaluate(() => document.body.innerText);

        // Combine HTML and text content into an object
        const outputData = {
            html: htmlContent,
            text: textContent
        };

        // Write the extracted content to a JSON file
        await fs.writeFile(path.join(dataOutput + config.files.dataJson), JSON.stringify(outputData, null, config.variables.jsonIndentation));

        // Return the extracted content for potential further use
        return txtAndHtmlContent = outputData;
    }
    catch (err) {
        logger.error('Extracting html & text content', err);
    }
}