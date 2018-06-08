var laasRepository=require("../db/laasRepository");

exports.getProductCode=function(req,res,next){

    console.log("in steppers --> getProductCode method");
    const txnTypeId=req.body.txntypeid;
    laasRepository.getProductCode(txnTypeId)
        .then((result)=>{
            res.locals.productCode=result[0].ProductCode;
            next();
        })
        .catch((err)=>{
            res.status(400);
            res.send({
                response:err.message
            })
        });

};