var laasRepository=require("../db/laasRepository");
var logger = require("../utils/logger");
exports.invokeSPParameter=function(req,res,next){
    logger.log('info',"inside invokeSPParameter-->"+res.locals.executeInstrumentParam);

    if(res.locals.executeInstrumentParam) {
        const SPName=res.locals.SPName;
        const SPParameters=res.locals.SPParameters;
        const instrumentType=res.locals.instrumentParam;
        const productCode=res.locals.productCode;
        const paymentMode=res.locals.paymentMode;

        var formatInstrumentParam=formatProcedureString(instrumentType);
        var formatSPParameter=formatProcedureString(SPParameters);
        var formatPaymentMode=formatProcedureString(paymentMode);

        laasRepository.invokeSPParamter(SPName,formatSPParameter,formatInstrumentParam,productCode,formatPaymentMode)
            .then((result)=>{
                    res.send("success");
               /* var request = {
                    "txnno": "12345",
                    "paymentstatus": 1,
                    "reason": "Accepted"
                };

                http.post('client-URL','/UpdateIncomingPayment',request)
                    .then((result) => {
                        console.log("Result   ---- " + JSON.stringify(result));
                    })
                    .catch((error) => {
                        console.log("Error   ---- " + error);
                    })*/

            })
            .catch((err)=>{
                logger.log("error","error in "+SPName+" "+err.message);
            });

    }
    next();




};

var formatProcedureString=(parameters)=>{
    var procedureString="";
    try {
        for (const key in parameters) {
            procedureString += parameters[key] + ","
        }
        procedureString.substring(0, procedureString.length - 1);
    }
    catch(err){
        logger.log("error","error in formatProcedureString "+err.message);
    }
    return procedureString;


};