var laasRepository=require("../db/laasRepository");

var logger = require("../utils/logger");

exports.setSPParameter=function(req,res,next){

    logger.log('info',"inside setSPParameters");
    const laasData=req.body;
    var SPParameters={};

    var parameters=res.locals.parameters;
    try {
        parameters.sort(sortBy("paramSno"));
    }
    catch(err){
        logger.log("info","error in parameters "+err.message);
    }
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

var sortBy=(prop)=>{
    return function(a,b){
        if( a[prop] > b[prop]){
            return 1;
        }else if( a[prop] < b[prop] ){
            return -1;
        }
        return 0;
    }
};