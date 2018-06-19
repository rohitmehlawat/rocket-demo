var laasRepository = require("../db/laasRepository");
var logger = require("../utils/logger");
var responseUtil = require('../utils/responseUtil');
var dateFormat=require("dateformat");
exports.invokeSPParameter = function (req, res, next) {


    if (res.locals.executeInstrumentParam === false) {
        console.log("in steppers ---> invoke SP Parameters");
        const SPName = res.locals.SPName;
        const SPParameters = res.locals.SPParameters;

        if (SPName === undefined || SPParameters === undefined) {
            logger.log('info', "error in invokeSPParameter, doesnot contain the required field");
            req.headers.statusCode="E00002";
            var response = responseUtil.createResponse('failure', 'E00002', req.body.txnno);
            res.send(response);
            return;
        }
        else {
            logger.log("info","SP Name-->"+SPName);
            logger.log("info","SPParameters-->"+JSON.stringify(SPParameters));
        }


        var formatSPParameter = formatProcedureString(SPParameters);

        laasRepository.invokeAllParameter(SPName, formatSPParameter)
            .then((result) => {
                req.headers.statusCode="S00001";
                var response = responseUtil.createResponse('success', 'S00001', req.body.txnno);
                res.send(response);

            })
            .catch((err) => {
                logger.log("error", "error in " + SPName + " " + err.message);
                req.headers.statusCode="D75100";
                var response = responseUtil.createResponse('failure', 'D75100', req.body.txnno);
                res.send(response);

            });
    }


};

var formatProcedureString=(parameters)=>{
    var procedureString="";
    parameters.forEach((parameter)=>{
        try {
            const dataType=parameter["dataType"];
            for (const key in parameter) {
                if(key!="dataType"){
                    if(dataType.indexOf("char")>-1){
                        procedureString += "'"+parameter[key]+"'"+ ",";
                    }
                    else if(dataType.indexOf("datetime")>-1){
                        procedureString += "'"+new Date(parameter[key])+"'"+ ",";
                    }
                    else{
                        procedureString += parameter[key] + ","
                    }
                }
            }
            procedureString.substring(0, procedureString.length - 1);
        }
        catch(err){
            logger.log("error","error in formatProcedureString "+err.message);
        }
    });

    return procedureString;


};