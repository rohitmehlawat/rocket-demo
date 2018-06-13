var laasRepository=require("../db/laasRepository");
var logger = require("../utils/logger");
var responseUtil = require('../utils/responseUtil');
exports.invokeAllParameter=function(req,res,next){
    logger.log('info',"inside invokeSPParameter-->"+res.locals.executeInstrumentParam);

    if(res.locals.executeInstrumentParam) {
        const SPName=res.locals.SPName;
        const SPParameters=res.locals.SPParameters;

        if(SPName===undefined || SPParameters===undefined ){
            logger.log('info',"error in invokeAllParameter, doesnot contain the required field");
            var response = responseUtil.createResponse('failure','E00002', req.body.txnno);
            res.send(response);
            return;
        }
        var formatSPParameter=formatProcedureString(SPParameters);

        laasRepository.invokeSPParamter(SPName,formatSPParameter)
            .then((result)=>{
                var response = responseUtil.createResponse('success','S00001', req.body.txnno);
                res.send(response);
                return;
            })
            .catch((err)=>{
                logger.log("error","error in "+SPName+" "+err.message);
                var response = responseUtil.createResponse('failure','D75100', req.body.txnno);
                res.send(response);
                return;
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