var laasRepository = require("../db/laasRepository");
var logger = require("../utils/logger");
var responseUtil = require('../utils/responseUtil');
var dateFormat=require("dateformat");
exports.invokeSPParameter = function (req, res, next) {

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
            logger.log("info","final SPParameters-->"+JSON.stringify(SPParameters));
			//console.log(JSON.stringify(SPParameters));
        }


        var formatSPParameter = formatProcedureString(SPParameters);
        logger.log("info","the final SP Parameters string is -->"+formatSPParameter);
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
};

var formatProcedureString=(parameters)=>{
    var procedureString="";
    parameters.forEach((parameter)=>{
        try {
			//console.log("parameter-->"+JSON.stringify(parameter));
            const dataType=parameter["dataType"];
            for (const key in parameter) {
                if(key!="dataType" && key!="paramSno"){
                    if(dataType.indexOf("char")>-1){
                        procedureString += "'"+parameter[key]+"'"+ ",";
                    }
                    else if(dataType.indexOf("datetime")>-1 && parameter[key]!==""){
                        procedureString += "'"+dateFormat(new Date(parameter[key]),"mmm dd yyyy HH:MM:ss")+"'"+ ",";
                    }
                    else{
                        procedureString += parameter[key] + ","
                    }
                    break;
                }
            }

        }
        catch(err){
            logger.log("error","error in formatProcedureString "+err.message);
        }
        
    });
	//console.log(procedureString);
	procedureString=procedureString.substring(0, procedureString.length - 1);

    return procedureString;


};