var laasRepository=require("../db/laasRepository");
var logger = require("../utils/logger");
exports.invokeAllParameter=function(req,res,next){



    if(res.locals.executeInstrumentParam===false){
        console.log("in steppers ---> invoke All Parameters");
        const SPName=res.locals.SPName;
        const SPParameters=res.locals.SPParameters;

        var formatSPParameter=formatProcedureString(SPParameters);
        laasRepository.invokeAllParameter(SPName,formatSPParameter)
            .then((result)=>{
                res.send("success");
            })
            .catch((err)=>{

            });
    }




};

var formatProcedureString=(SPParameters)=>{
    var procedureString="";
    try {
        for (const key in SPParameters) {
            procedureString += SPParameters[key] + ","
        }
        procedureString.substring(0, procedureString.length - 1);
    }
    catch(err){
        logger.log("error","error in formatProcedureString "+err.message);
    }
    return procedureString;


};