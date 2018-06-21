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
    parameters.forEach((parameter) => {
        var spData = {};
        try {
            const parentParameter=parameter.APIParameterParent.trim();
            const childParameter=parameter.APIParameter.trim();
            const spParameter=parameter.SPParameter.trim();
            if (parentParameter !== "") {
                if (laasData.hasOwnProperty(parentParameter)){
                    logger.log("info"," APIParamter Parent-->"+parentParameter);
                    var obj=laasData[parentParameter];
                    logger.log("info"," APIParamter Parent object inside request-->"+JSON.stringify(obj));
                    if (obj.hasOwnProperty(childParameter)) {
                        logger.log("info"," APIParamterParent-->"+parentParameter+" contains APIParmeter-->"+ childParameter+" inside request object -->"+obj[childParameter]);
                        spData[spParameter] = obj[childParameter];
                    }
                    else {
                        logger.log("info"," APIParamter--> "+childParameter+" object inside request is not available-->"+obj[childParameter]);
                        spData[spParameter] = "";
                    }

                }
                else {
                    logger.log("info"," APIParamter Parent-->"+parentParameter+" is not available in request object-->"+laasData[parentParameter]);
                    spData[spParameter] = "";
                }
            }
            else {
                if (laasData.hasOwnProperty(childParameter)) {
                    logger.log("info"," APIParmeter-->"+ childParameter+" inside request object -->"+laasData[childParameter]);
                    spData[spParameter] = laasData[childParameter];
                }
                else {
                    logger.log("info"," APIParmeter-->"+ childParameter+" inside request object is not available -->"+laasData[childParameter]);
                    spData[spParameter] = "";
                }
            }
            spData["dataType"] = parameter.DataType.trim();
            spData["paramSno"]=parameter.paramSno;
            SPParameters.push(spData);
        }
        catch (err) {
            logger.log("error", "error in setSPParameter -->" + err.message);
        }


    });

    res.locals.SPParameters=SPParameters;

    try {
        SPParameters.sort(sortBy("paramSno"));

    }
    catch(err){
        logger.log("info","error in parameters "+err.message);
        req.headers.statusCode="E00004";
        var response = responseUtil.createResponse('failure','E00004', req.body.txnno);
        res.send(response);
    }








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