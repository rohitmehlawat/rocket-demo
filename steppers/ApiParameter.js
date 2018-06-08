var instrumentParam=require("../steppers/instrumentParam");
var invokeAllParameter=require("../steppers/invokeAllParameter");
exports.checkAPIParameter=function(req,res,next){

    console.log("in steppers --> checkAPIParameter method");
    res.locals.executeInstrumentParam = false;
    const parameters=res.locals.parameters;
    parameters.forEach((parameter)=>{
        if(parameter.APIParameter==="TxnTypeidRef" || parameter.APIParameter==="PaymentModeRef" ){
            res.locals.executeInstrumentParam = true;
            return;
        }
    });

    next();

};