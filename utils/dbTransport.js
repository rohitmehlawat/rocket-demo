const Transport = require('winston-transport');
const util = require('util');
const logger = require("../utils/logger");
const laasRepository = require("../db/laasRepository");
var RequestResponseData = require("../model/RequestResponse");
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
        responseData.setData("requestTime", new Date(meta.req.headers.requestTime));
        responseData.setData("responseTime", new Date(meta.req.headers.requestTime + meta.responseTime));
        responseData.setData("hostIp", meta.req.headers.host);
        responseData.setData("ssid", meta.req.headers.ssid);
        responseData.setData("txnTypeId", meta.req.body.txntypeid);
        responseData.setData("txnNo", meta.req.body.txnno);
        responseData.setData("responseCode", meta.res.statusCode);
        responseData.setData("responseStatus", meta.res.body.status);
        laasRepository.logRequestResponse(responseData)
            .then((result) => {

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