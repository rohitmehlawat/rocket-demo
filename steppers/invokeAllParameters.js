var laasRepository=require("../db/laasRepository");
var logger = require("../utils/logger");
exports.invokeSPParameter=function(req,res,next){
    logger.log('info',"inside invokeSPParameter-->"+res.locals.executeInstrumentParam);

    if(res.locals.executeInstrumentParam) {
        const SPName=res.locals.SPName;
        const SPParameters=res.locals.SPParameters;
        const instrumentType=res.locals.instrumentParam;
        const productCode=res.locals.productCode;
        const paymentParam=res.locals.paymentParam;

        var formatInstrumentParam=formatProcedureString(instrumentType);
        var formatSPParameter=formatProcedureString(SPParameters);
        var formatPaymentParam=formatProcedureString(paymentParam);

        laasRepository.invokeSPParamter(SPName,formatSPParameter,formatInstrumentParam,productCode,formatPaymentParam)
            .then((result)=>{
                res.json(
                    {
                        "status":"success",
                        "code":200,
                        "messages":"",
                        "result":{
                            "txn":{
                                "txnno":req.body.txnno
                            }
                        }

                    });

            })
            .catch((err)=>{
                logger.log("error","error in "+SPName+" "+err.message);
                res.status(400);
                res.send({
                    response:err.message
                });
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