const expressWinston = require('express-winston');
const winston = require('winston');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const rfs = require('rotating-file-stream');

var config = winston.config;

var logger = {};

logger.bind = bind;
logger.bindForAccessLogs = bindForAccessLogs;

var prettyFormatter = function(options) {
    return `${options.timestamp()} ${options.level.toUpperCase()}`
        + (options.message || '')
        + (options.meta && Object.keys(options.meta).length ? JSON.stringify(options.meta, null, '\t') : '');

}

var normalFormatter = function(options) {
    return '[' + options.timestamp() + '] [' +
        options.level.toUpperCase() + '] ' +
        (options.message ? options.message : '') +
        (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');

}

var getFormatter = function(isPretty)  {
    return isPretty ? prettyFormatter : normalFormatter;
}

function bind(app, level, directory, fileName, rotatingStrategy, isPretty) {

    var logDirectory = path.join(__dirname, "/../"+directory);

    // ensure log directory exists
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

    // create a rotating write stream
    var logStream = rfs(fileName, {
        interval: rotatingStrategy, // rotate daily
        path: logDirectory
    })
    // setup the logger
    app.use(expressWinston.logger({
        level: level,
        transports: [new winston.transports.File(
            {
                stream: logStream,
                json: false,
                timestamp: function () {
                    return new Date();
                },
                formatter: getFormatter(isPretty),
                handleExceptions: true
            }
        )]
    }));
}

function bindForAccessLogs(app, directory, fileName, loggerFormat, rotatingStrategy) {
    var logDirectory = path.join(__dirname, directory)

    // ensure log directory exists
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

    // create a rotating write stream
    var logStream = rfs(fileName, {
        interval: rotatingStrategy, // rotate daily
        path: logDirectory
    })
    // setup the logger
    app.use(morgan(loggerFormat, { stream: logStream }))
}

module.exports = logger;