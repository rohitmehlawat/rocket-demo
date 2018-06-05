var laasRepository=require("../db/laasRepository");

exports.getInstrumentType=function(req,res,next){

    console.log("in steppers ---> getting instrument type");

    const txnTypeId=req.body.txntypeid;

    var instrumentParam=laasRepository.getInstrumentType(txnTypeId);

    res.locals.instrumentParam=instrumentParam;
    next();



};