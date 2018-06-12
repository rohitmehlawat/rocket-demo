const expressWinston = require('express-winston');
const winston = require('winston');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const rfs = require('rotating-file-stream');
const dbTransport = require('../utils/dbTransport');
const Transport = require('winston-transport');
const util = require('util');

var logger = {};

logger.bind = bind;
logger.bindForAccessLogs = bindForAccessLogs;
logger.log = log;

var logStream;

var prettyFormatter = function (options) {
    return `${options.timestamp()} ${options.level.toUpperCase()} `
        + (options.message || '')
        + (options.meta && Object.keys(options.meta).length ? JSON.stringify(options.meta, null, '\t') : '');

}

var normalFormatter = function (options) {
    return '[' + options.timestamp() + '] [' +
        options.level.toUpperCase() + '] ' +
        (options.message ? options.message : '') +
        (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');

}

var getFormatter = function (isPretty) {
    return isPretty ? prettyFormatter : normalFormatter;
}

function bind(app, level, directory, fileName, rotatingStrategy, isPretty) {

    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');

    var logDirectory = path.join(__dirname, "/../" + directory);

    // ensure log directory exists
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

    // create a rotating write stream
    logStream = rfs(fileName, {
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
                formatter: getFormatter(isPretty)
            }
        ),
        dbTransport
    ]
    }));

    app.use(expressWinston.errorLogger({
        level: level,
        transports: [new winston.transports.File(
            {
                stream: logStream,
                json: false,
                timestamp: function () {
                    return new Date();
                },
                formatter: getFormatter(isPretty),
            }
        ), 
        dbTransport]
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


function log(level, message) {

    var logDirectory = path.join(__dirname, "/../" + 'log');

    // ensure log directory exists
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

    // create a rotating write stream
    var logStream = rfs('appLog.log', {
        interval: '1d', // rotate daily
        path: logDirectory
    })
    // setup the logger
    var localLogger =  new winston.Logger({
        level: level,
        transports: [new winston.transports.File(
            {
                stream: logStream
            }
        )],
        exitOnError: false
    });

    localLogger.log(level, message);
}

module.exports = logger;