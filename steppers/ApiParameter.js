var instrumentParam=require("../steppers/instrumentParam");
var invokeAllParameter=require("../steppers/invokeAllParameter");
exports.checkAPIParameter=function(req,res,next){

    console.log("in steppers --> checkAPIParameter method");

    const isTxnTypeId=req.body.hasOwnProperty("TxnTypeidRef");
    const isPaymentModeRef=req.body.hasOwnProperty("PaymentModeRef");

    if(isTxnTypeId || isPaymentModeRef){
        res.locals.executeInstrumentParam = true;
        next();
    }
    else{
        res.locals.executeInstrumentParam = false;
        next();

    }

};