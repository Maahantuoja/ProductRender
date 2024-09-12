const config = require('../configs/config.json');
const logger = require('./logger');

const responseStatusCode = config.variables.responseStatusCode;
const sliceAmount = config.variables.sliceAmount;

module.exports = imageListener = async page => {
    try {
        logger.info('Setting up listener for image responses...');

        const imageResponses = [];
        
        // Setting up a listener for network responses
        page.on('response', async response => {
            if (response.request().resourceType() === 'image') { // Checking if the response is an image
                if (response.status() === responseStatusCode) {  // Checking if the response status matches the expected status code
                    const buffer = await response.buffer();      // If the conditions are met, storing the image response details
                    imageResponses.push({
                        url: response.url(),
                        buffer: buffer
                    });
                }
                else {
                    // If the response status does not match, it may be an error or another type of response
                    // Uncomment the following line for debugging purposes
                    // console.log('Other responses or error situations:', response.status());
                }
            }
        });
        return imageResponses;
    }
    catch (err) {
        logger.error('Setting up listener:', err.stack.slice(sliceAmount));
    }
}