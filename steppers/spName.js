var laasRepository=require("../db/laasRepository");

exports.getSPName=function(req,res,next){

    console.log("in steppers --> getSPName method");

    const productCode=res.locals.productCode;

    const ssid=req.headers.ssid;

    const txnTypeId=req.body.txntypeid;

    var SPName=laasRepository.getSPName(ssid,txnTypeId,productCode);

    res.locals.spName=SPName;

    next();

};