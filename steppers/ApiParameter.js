var logger = require("../utils/logger");
var responseUtil = require('../utils/responseUtil');
exports.checkAPIParameter=function(req,res,next){


    logger.log('info',"inside checkAPIParameters");

    res.locals.executeInstrumentParam = false;
    const parameters=res.locals.parameters;
    if(parameters===undefined){
        logger.log('info',"error in checkAPIParameter doesnot contain the required field");
        var response = responseUtil.createResponse('failure','E00002', req.body.txnno);
        res.send(response);
        return;
    }

    parameters.forEach((parameter)=>{
        if(parameter.APIParameter==="TxnTypeidRef" || parameter.APIParameter==="PaymentModeRef" ){
            res.locals.executeInstrumentParam = true;
            return;
        }
    });

    next();

};