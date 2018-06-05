var laasRepository=require("../db/laasRepository");

exports.getPaymentMode=function(req,res,next){

    console.log("in steppers --> getPaymentMode method");

  var paymentModeRef=req.body.paymentModeRef;
  if(paymentMode>0){
      laasRepository.getPaymentMode(paymentModeRef);

  }
  next();


};