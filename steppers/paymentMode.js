var laasRepository=require("../db/laasRepository");
var logger = require("../utils/logger");
var responseUtil = require('../utils/responseUtil');
exports.getPaymentMode=function(req,res,next){

    logger.log('info',"inside paymentMode--->"+res.locals.executeInstrumentParam);
    if(res.locals.executeInstrumentParam) {

        var SPParamters=res.locals.SPParameters;
        var paymentModeRef = req.body.charges;
        if(paymentModeRef===undefined){
            logger.log('error',"error in getPaymentMode, doesnot contain the required field paymentModeRef");
            req.headers.statusCode="E00002";
            var response = responseUtil.createResponse('failure','E00002', req.body.txnno);
            res.send(response);
            return;
        }
        var paymentAmount=paymentAmount(paymentModeRef);
        if (paymentAmount > 0) {
            laasRepository.getPaymentMode(paymentAmount)
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

var paymentAmount=(charges)=>{
    if(charges!==undefined){
        if(charges.hasOwnProperty(cstotalamt) && charges.cstotalamt>0){
            return charges.cstotalamt;
        }
        else if(charges.hasOwnProperty(cqtotalamt) && charges.cqtotalamt>0){
                return charges.cqtotalamt;
        }
        else if(charges.hasOwnProperty(cctotalamt) && charges.cctotalamt>0){
            return charges.cctotalamt;
        }
        else if(charges.hasOwnProperty(dctotalamt) && charges.dctotalamt>0){
            return charges.dctotalamt;
        }
        else if(charges.hasOwnProperty(actotalamt) && charges.actotalamt>0){
            return charges.actotalamt;
        }
        else if(charges.hasOwnProperty(optotalamt) && charges.optotalamt>0){
            return charges.optotalamt;
        }
        else if(charges.hasOwnProperty(kntotalamt) && charges.kntotalamt>0){
            return charges.kntotalamt;
        }
        else if(charges.hasOwnProperty(dftotalamt) && charges.dftotalamt>0){
            return charges.dftotalamt;
        }
        else if(charges.hasOwnProperty(wltotalamt) && charges.wltotalamt>0){
            return charges.wltotalamt;
        }
        else{
            return 0;
        }
    }
    else{
        return 0;
    }
};