const fs = require('fs').promises;
const path = require('path');
const config = require('../configs/config.json');

// Module is responsible for consolidating collected data, including screenshot paths, captured image URLs, and text and HTML content. The consolidated data is then written to a JSON file for further use.
module.exports = consolidateData = async (screenshotPath, capturedImageURLs, txtAndHtmlContent, dataOutput) => {
    try {
        logger.info('Consolidate collected data...');

        const consolidatedData = {
            screenshotPath: screenshotPath,
            images: capturedImageURLs,
            textContent: txtAndHtmlContent.text,
            htmlContent: txtAndHtmlContent.html,
        };

        await fs.writeFile(path.join(dataOutput + config.files.consolidatedDataJson), JSON.stringify(consolidatedData, null, config.variables.jsonIndentation));
    }
    catch (err) {
        logger.error('Consolidate to file:', err);
    }
}