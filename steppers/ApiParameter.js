var logger = require("../utils/logger");
exports.checkAPIParameter=function(req,res,next){


    logger.log('info',"inside checkAPIParameters");

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