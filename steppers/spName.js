var laasRepository=require("../db/laasRepository");

exports.getSPName=function(req,res,next){

    console.log("in steppers --> getSPName method");

    const productCode=res.locals.productCode;

    const ssid=res.locals.sourceSystemId;

    const txnTypeId=req.body.txntypeid;

    laasRepository.getSPName(ssid,txnTypeId,productCode)
        .then((result)=>{

            res.locals.SPName=result[0].SPName;
            next();
        })
        .catch((err)=>{
            res.status(400);
            res.send({
               response:err.message
            });

        });




};