var laasRepository=require("../db/laasRepository");

exports.getSPParamters=function(req,res,next){

    console.log("in steppers --> getSPParameters method");

    const productCode=res.locals.productCode;

    const ssid=req.headers.ssid;

    const txnTypeId=req.body.txntypeid;

    var parameters=laasRepository.getParamters(ssid,txnTypeId,productCode);

    res.locals.parameters=parameters;

    next();


};