var laasRepository=require("../db/laasRepository");
var logger = require("../utils/logger");
exports.getPaymentMode=function(req,res,next){

    logger.log('info',"inside paymentMode--->"+res.locals.executeInstrumentParam);
    if(res.locals.executeInstrumentParam) {


        var paymentModeRef = req.body.charges.PaymentModeParam;
        if (paymentModeRef > 0) {
            laasRepository.getPaymentMode(paymentModeRef)
                .then((result)=>{
                    logger.log('info',"in paymentMode Result ------>>>>>"+ JSON.stringify(result));
                    res.locals.paymentParam = result[0];
                })
                .catch((err)=>{
                    logger.log('error',"error in p_getPaymenetModeIDRef  "+err.message);
                    res.status(400);
                    res.send({
                        response:err.message
                    });
                });

        }
    }
  next();
};