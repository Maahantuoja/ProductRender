const config = require('../configs/config.json');
const sliceAmount = config.variables.sliceAmount;

module.exports = addDelay = async ms => {
    try {
        if (ms > 0) {
            logger.info('Adding delay: ' + ms + ' ms...');
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    } 
    catch (err) {
        logger.error('Adding delay:', err.stack.slice(sliceAmount));
    }
}