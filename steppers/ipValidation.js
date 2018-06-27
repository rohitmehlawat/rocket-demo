var laasRepository=require("../db/laasRepository");
var requestIP=require("request-ip");
var logger = require("../utils/logger");
var responseUtil = require('../utils/responseUtil');
exports.validateIP=function(req,res,next) {

    logger.log('info',"inside ip validation");
	var requsetIP="";
    const ssid=res.locals.sourceSystemId;
    const reqIP=requestIP.getClientIp(req); // getting client IP
    if(ssid===undefined || reqIP===undefined){
        logger.log('info',"error in ip validation doesnot contain the ssid and request IP");
        req.headers.statusCode="E00002";
        var response = responseUtil.createResponse('failure','E00002', req.body.txnno);
        res.send(response);
        return;
    }
	else{
		
		if(reqIP.indexOf(":")>-1){
			requsetIP=reqIP.substring(reqIP.lastIndexOf(":")+1);
		}
		else{
			requsetIP=reqIP;
		}		
		logger.log('info',"ip address--->"+requsetIP);
		logger.log('info',"ssid-->"+ssid);
	}

    laasRepository.validateIP(ssid,requsetIP)
        .then((result)=>{
            logger.log('info',"in ip validation Result ------>>>>>"+ JSON.stringify(result));
            try{
                if(result[0].ValdationStatus===1){
                    next();
                }
                else{
                    logger.log('info',"in ip validation --> request_ip_address is not authenticated ");
                    req.headers.statusCode="E00001";
                    var response = responseUtil.createResponse('failure','E00001', req.body.txnno);
                    res.send(response);

                }
            }
            catch(err){
                logger.log("error","couldn't get validation status from the result -->"+err.message);
                req.headers.statusCode="E00001";
                var response = responseUtil.createResponse('failure','E00001', req.body.txnno);
                res.send(response);

            }

        })
        .catch((err)=>{
            logger.log('error',"error in p_validateHostIP "+err.message);
            req.headers.statusCode="D75100";
            var response = responseUtil.createResponse('failure','D75100', req.body.txnno);
            res.send(response);
        });
};