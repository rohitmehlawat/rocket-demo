var laasRepository=require("../db/laasRepository");

exports.getPaymentMode=function(req,res,next){
    if(res.locals.executeInstrumentParam) {
        console.log("in steppers --> getPaymentMode method");

        var paymentModeRef = req.body.charges.PaymentModeParam;
        if (paymentModeRef > 0) {
            laasRepository.getPaymentMode(paymentModeRef)
                .then((result)=>{
                    res.locals.paymentMode = result[0];
                })
                .catch((err)=>{
                    res.status(400);
                    res.send({
                        response:err.message
                    });
                });

        }
    }
  next();
};