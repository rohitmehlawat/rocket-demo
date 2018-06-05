var laasRepository=require("../db/laasRepository");

exports.getPaymentMode=function(req,res,next){
    if(res.locals.executeInstrumentParam) {
        console.log("in steppers --> getPaymentMode method");

        var paymentModeRef = req.body.paymentModeRef;
        if (paymentMode > 0) {
            laasRepository.getPaymentMode(paymentModeRef)
                .then((result)=>{
                    res.locals.paymentMode = result;
                })
                .catch((err)=>{

                });

        }
    }
  next();
};