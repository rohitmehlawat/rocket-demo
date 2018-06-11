var laasRepository=require("../db/laasRepository");

var logger = require("../utils/logger");

exports.setSPParameter=function(req,res,next){

    logger.log('info',"inside setSPParameters");
    const laasData=req.body;
    var SPParameters={};

    const parameters=res.locals.parameters;
    parameters.forEach((parameter)=> {
        if(parameter.APIParameterParent!==""){
            if(parameter.DataType.contains("char")){
                SPParameters[parameter.SPParameter]=laasData[parameter.APIParameterParent][parameter.APIParameter]+"";
            }
            else{
                SPParameters[parameter.SPParameter]=laasData[parameter.APIParameterParent][parameter.APIParameter];
            }
        }
        else{
            if(parameter.DataType.contains("char")){
                SPParameters[parameter.SPParameter]=laasData[parameter.APIParameter]+"";
            }
            else{
                SPParameters[parameter.SPParameter]=laasData[parameter.APIParameter];
            }
        }


    });

    res.locals.SPParameters=SPParameters;








    next();
};