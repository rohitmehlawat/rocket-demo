var laasRepository=require("../db/laasRepository");

exports.getSPParamters=function(req,res,next){

    console.log("in steppers --> getSPParameters method");

    const productCode=res.locals.productCode;

    const ssid=req.headers.ssid;

    const txnTypeId=req.body.txntypeid;

    laasRepository.getParamters(ssid,txnTypeId,productCode)
        .then((result)=>{
            res.locals.parameters=result;
            next();
        })
        .catch((err)=>{

        });




};