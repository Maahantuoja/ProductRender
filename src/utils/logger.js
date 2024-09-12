const { createLogger, format, transports } = require('winston');
const path = require('path');
const fs = require('fs');
const config = require('../configs/config.json');
const appLog = config.paths.appLog;

const appLogPath = path.join(__dirname, appLog, 'app.log');

// "For testing and debugging purposes only, this delete the existing log file and generate a new clean log each time the program is started.
if (fs.existsSync(appLogPath)) {
    fs.unlinkSync(appLogPath);
}

// Creating and exporting the logger instance using Winston
module.exports = logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
    ),
    transports: [
        new transports.File({ filename: appLogPath }),
        new transports.Console(),
    ]
});
