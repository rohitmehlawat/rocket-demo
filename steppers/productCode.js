var laasRepository=require("../db/laasRepository");

exports.getProductCode=function(req,res,next){

    console.log("in steppers --> getProductCode method");
    const txnTypeId=req.body.txntypeid;
    const productCode=laasRepository.getProductCode(txnTypeId);
    res.locals.productCode=productCode;
    next();
};