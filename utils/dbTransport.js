const Transport = require('winston-transport');
const util = require('util');
const logger = require("../utils/logger");
var RequestResponseData = require("../model/RequestResponse");
var dateFormat=require("dateformat");
//
// Inherit from `winston-transport` so we can take advantage
// of the base functionality and `.exceptions.handle()`.
//
class DBTransport extends Transport {
    constructor(opts) {
        super(opts);
    }

    log(level, msg, meta, callback) {
        setImmediate(() => {
            this.emit('logged', msg);
        });

        var responseData = new RequestResponseData();
        responseData.setData("requestTime",  dateFormat(meta.req.headers.requestTime,"mmm dd yyyy HH:MM:ss"));
        responseData.setData("responseTime", dateFormat(meta.req.headers.requestTime + meta.responseTime,"mmm dd yyyy HH:MM:ss"));
        responseData.setData("hostIp", meta.req.headers.host);
        responseData.setData("ssid", meta.req.headers.ssid);
        responseData.setData("txnTypeId", meta.req.body.txntypeid);
        responseData.setData("txnNo", meta.req.body.txnno);
        responseData.setData("responseCode", meta.req.headers.statusCode);
        responseData.setData("responseStatus", (meta.res.body.status==="success")?1:0);
        const laasRepository = require("../db/laasRepository");
        laasRepository.logRequestResponse(responseData)
            .then((result) => {
                logger.log("info","request response data inserted to db");
            })
            .catch((err) => {
                logger.log("error", "error p_logRequestResponse " + err.message);

            });
    }
};
//Creating instance of custom logger

var dbTransport = new DBTransport();
dbTransport.on('logged', function (info) {
});

module.exports = dbTransport;