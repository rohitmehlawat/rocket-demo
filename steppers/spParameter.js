var laasRepository=require("../db/laasRepository");

var logger = require("../utils/logger");

var responseUtil = require('../utils/responseUtil');

exports.setSPParameter=function(req,res,next){

    logger.log('info',"inside setSPParameters");
    const laasData=req.body;
    var parameters=res.locals.parameters;
    var SPParameters=[];
    if(laasData===undefined || parameters===undefined){
        logger.log('info',"error in setSPParameters doesnot contain the required field");
        req.headers.statusCode="E00002";
        var response = responseUtil.createResponse('failure','E00002', req.body.txnno);
        res.send(response);
    }

    try {
        parameters.sort(sortBy("paramSno"));
    }
    catch(err){
        logger.log("info","error in parameters "+err.message);
        req.headers.statusCode="E00004";
        var response = responseUtil.createResponse('failure','E00004', req.body.txnno);
        res.send(response);
    }
    parameters.forEach((parameter) => {
        var spData = {};
        try {
            if (parameter.APIParameterParent !== "") {
                if (laasData.hasOwnProperty(parameter.APIParameterParent)){
                        var obj=laasData[parameter.APIParameterParent];
                        if(obj.hasOwnProperty(parameter.APIParameter))
                            spData[parameter.SPParameter] = laasData[parameter.APIParameterParent][parameter.APIParameter];
                        else
                            spData[parameter.SPParameter] = "";
                }
                else
                    spData[parameter.SPParameter] = "";
            }
            else {
                if (laasData.hasOwnProperty(parameter.APIParameter)) {
                    spData[parameter.SPParameter] = laasData[parameter.APIParameter];
                }
                else
                    spData[parameter.SPParameter] = "";
            }
            spData["dataType"] = parameter.DataType;
            SPParameters.push(spData);
        }
        catch (err) {
            logger.log("error", "error in setSPParameter -->" + err.message);
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