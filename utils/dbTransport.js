const Transport = require('winston-transport');
const util = require('util');
const logger=require("../utils/logger");
const laasRepository=require("../db/laasRepository");
var RequestResponseData=require("../model/RequestResponse");
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

        const requestTime="";
        const responseTime="";
        const hostIp = meta.req.headers.host;
        const ssid="";
        const txnTypeId = meta.req.body.txntypeid;
        const txnNumber = meta.req.body.txnno;
        const responseCode = meta.res.statusCode;
        const responseStatus = meta.res.body.statusResponse;

        var responseData=new RequestResponseData();
        responseData.setData("requestTime","3232");
        responseData.setData("responseTime","3223");
        responseData.setData("hostIp",meta.req.headers.host);
        responseData.setData("ssid","323223");
        responseData.setData("txnTypeId",meta.req.body.txntypeid);
        responseData.setData("txnNo",meta.req.body.txnno);
        responseData.setData("responseCode",meta.res.statusCode);
        responseData.setData("responseStatus", meta.res.body.status);
        laasRepository.logRequestResponse(responseData)
            .then((result)=>{

            })
            .catch((err)=>{
                logger.log("error","error p_logRequestResponse "+err.message);

            });
    }
  };
 //Creating instance of custom logger

 var dbTransport = new DBTransport();
 dbTransport.on('logged', function(info){
 });

 module.exports = dbTransport;