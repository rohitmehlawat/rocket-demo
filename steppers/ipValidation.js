var laasRepository=require("../db/laasRepository");
var requestIP=require("request-ip");
var logger = require("../utils/logger");
var responseUtil = require('../utils/responseUtil');
exports.validateIP=function(req,res,next) {

    logger.log('info',"inside ip validation");
    const ssid=res.locals.sourceSystemId;
    const reqIP=requestIP.getClientIp(req); // getting client IP
    if(ssid===undefined || reqIP===undefined){
        logger.log('info',"error in ip validation doesnot contain the ssid and request IP");
        var response = responseUtil.createResponse('failure','E00002', req.body.txnno);
        res.send(response);
        return;
    }

    laasRepository.validateIP(ssid,reqIP)
        .then((result)=>{
            logger.log('info',"in ip validation Result ------>>>>>"+ JSON.stringify(result));
            if(result[0].ValdationStatus===1){
                next();
            }
            else{
                logger.log('info',"in ip validation --> request_ip_address is not authenticated ");
                var response = responseUtil.createResponse('failure','E00001', req.body.txnno);
                res.send(response);

            }
        })
        .catch((err)=>{
            logger.log('error',"error in p_validateHostIP "+err.message);
            var response = responseUtil.createResponse('failure','D75100', req.body.txnno);
            res.send(response);
        });
};