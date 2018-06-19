var laasRepository=require("../db/laasRepository");
var logger = require("../utils/logger");
var responseUtil = require('../utils/responseUtil');
exports.getPaymentMode=function(req,res,next){

    logger.log('info',"inside paymentMode--->"+res.locals.executeInstrumentParam);
    if(res.locals.executeInstrumentParam) {

        var SPParamters=res.locals.SPParameters;
        var paymentModeRef = req.body.charges.PaymentModeParam;
        if(paymentModeRef===undefined){
            logger.log('info',"error in getPaymentMode, doesnot contain the required field paymentModeRef");
            req.headers.statusCode="E00002";
            var response = responseUtil.createResponse('failure','E00002', req.body.txnno);
            res.send(response);
            return;
        }

        if (paymentModeRef > 0) {
            laasRepository.getPaymentMode(paymentModeRef)
                .then((result)=>{
                    logger.log('info',"in paymentMode Result ------>>>>>"+ JSON.stringify(result));
                    try{
                        const paymentModeParam = result[0];
                        for(var key in paymentModeParam){
                            if(key.includes("PaymentMode")){
                                SPParamters[key]=paymentModeParam[key];
                            }
                        }
                        res.locals.SPParameters=SPParamters;
                    }
                    catch(err){
                        logger.log("error","couldn't get payment param from result -->"+err.message);
                    }


                })
                .catch((err)=>{
                    logger.log('error',"error in p_getPaymentModeIDRef  "+err.message);
                    req.headers.statusCode="D75100";
                    var response = responseUtil.createResponse('failure','D75100', req.body.txnno);
                    res.send(response);
                    return;
                });

        }
    }
  next();
};