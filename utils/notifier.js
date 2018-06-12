const lineReader = require('reverse-line-reader');
const fs = require('fs');
const config = require('../config/conf');
const log = require('../utils/logger');

var notifier = {};
notifier.notify = notify;

function notify() {
    var timeStampFile = config.get('notifier.timeStampFile')
    var logFile = config.get('notifier.logFile');
    isNotifyRequired(logFile, timeStampFile, function (lastUpdatedTime) {

        // read all lines:
        lineReader.eachLine(logFile, function (line) {
            if (line.indexOf('SIGKILL') > -1) {
                log.log('info',"SEND MAIL");
                return false;
            }
        }).then(function () {
            log.log('info',"DONE ----> Writing to timeStamp.");
            logTimeStamp(timeStampFile,lastUpdatedTime);
        });
    });
}

function isNotifyRequired(logFile, timeStampFile, callback) {
    fs.stat(logFile, function (err, stats) {
        var lastUpdatedTime = new Date(stats.mtime);
        fs.readFile(timeStampFile, function (err, data) {
            if (data) {
                var loggedTimeStamp = new Date(data);
                if (loggedTimeStamp < lastUpdatedTime) {
                    callback(lastUpdatedTime);
                }
                else {
                    return false;
                }

            }
            else {
                callback(lastUpdatedTime);
            }
        });
    });

}

function logTimeStamp(timeStampFile, timeStamp) {
    fs.writeFile(timeStampFile, timeStamp, function (err) {
        if (err) throw err;
        log.log('info',"Writing done");
    });
}

module.exports = notifier;



