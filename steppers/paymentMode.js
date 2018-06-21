var laasRepository=require("../db/laasRepository");
var logger = require("../utils/logger");
var responseUtil = require('../utils/responseUtil');
exports.getPaymentMode=function(req,res,next){

    logger.log('info',"inside paymentMode--->"+res.locals.executeInstrumentParam);
    if(res.locals.executeInstrumentParam) {

        var SPParamters=res.locals.SPParameters;
        var chargesObj = req.body.charges;
        if(chargesObj===undefined){
            logger.log('error',"error in getPaymentMode, doesnot contain the required field paymentModeRef");
            req.headers.statusCode="E00002";
            var response = responseUtil.createResponse('failure','E00002', req.body.txnno);
            res.send(response);
            return;
        }
        laasRepository.getPaymentMode()
            .then((result) => {
                logger.log('info', "in paymentMode Result ------>>>>>" + JSON.stringify(result));
                try {
                    var paymentID=0;
                    result.forEach((paymentModeObj)=>{
                        const key=paymentModeObj.PaymentModeParam.trim();
                        if(chargesObj.hasOwnProperty(key)){
                            if(chargesObj[key]>0){
                                paymentID=paymentModeObj.PaymentModeID;
                                return;
                            }
                        }
                    });
                    SPParamters.PaymentModeID=paymentID;
                    res.locals.SPParameters = SPParamters;
                }
                catch (err) {
                    logger.log("error", "couldn't get payment param from result -->" + err.message);
                }
            })
            .catch((err) => {
                logger.log('error', "error in p_getPaymentModeIDRef  " + err.message);
                req.headers.statusCode = "D75100";
                var response = responseUtil.createResponse('failure', 'D75100', req.body.txnno);
                res.send(response);
                return;
            });
    }
  next();
};