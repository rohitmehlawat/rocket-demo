var logger = require("../utils/logger");
var responseUtil = require('../utils/responseUtil');
exports.checkAPIParameter=function(req,res,next){


    logger.log('info',"inside checkAPIParameters");

    res.locals.executeInstrumentParam = false;
    const parameters=res.locals.parameters;
    if(parameters===undefined){
        logger.log('info',"error in checkAPIParameter doesnot contain the required field");
        req.headers.statusCode="E00002";
        var response = responseUtil.createResponse('failure','E00002', req.body.txnno);
        res.send(response);
        return;
    }
	for(var i=0;i<parameters.length;i++){
		if(parameters[i].APIParameter.trim().indexOf("TxnTypeIDRef")>-1 || parameters[i].APIParameter.trim().indexOf("PaymentModeIDRef")>-1 ){
            logger.log("ïnfo","APIParameter found");
			res.locals.executeInstrumentParam = true;
            break;
        }
	}

    next();

};