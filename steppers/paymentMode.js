var laasRepository=require("../db/laasRepository");
var logger = require("../utils/logger");
var responseUtil = require('../utils/responseUtil');
exports.getPaymentMode=function(req,res,next){

    logger.log('info',"inside paymentMode--->"+res.locals.executeInstrumentParam);
    if(res.locals.executeInstrumentParam) {


        var paymentModeRef = req.body.charges.PaymentModeParam;
        if(paymentModeRef===undefined){
            logger.log('info',"error in getPaymentMode, doesnot contain the required field paymentModeRef");
            var response = responseUtil.createResponse('failure','E00002', req.body.txnno);
            res.send(response);
            return;
        }

        if (paymentModeRef > 0) {
            laasRepository.getPaymentMode(paymentModeRef)
                .then((result)=>{
                    logger.log('info',"in paymentMode Result ------>>>>>"+ JSON.stringify(result));
                    res.locals.paymentParam = result[0];

                })
                .catch((err)=>{
                    logger.log('error',"error in p_getPaymenttModeIDRef  "+err.message);
                    var response = responseUtil.createResponse('failure','E00004', req.body.txnno);
                    res.send(response);
                    return;
                });

        }
    }
  next();
};