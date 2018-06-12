var laasRepository=require("../db/laasRepository");
var logger = require("../utils/logger");
var requestResponse=require("../utils/requestResponse");
exports.getProductCode=function(req,res,next){

    logger.log('info',"inside getProductCode");
    const txnTypeId=req.body.txntypeid;
    laasRepository.getProductCode(txnTypeId)
        .then((result)=>{
            logger.log('info',"in getProductCode Result ------>>>>>"+ JSON.stringify(result));
            res.locals.productCode=result[0].ProductCode;
            next();
        })
        .catch((err)=>{
            var response=requestResponse.requestResponseLog(req,res);
            logger.log('error',"error in p_getProductCode  "+err.message);
            res.status(400);
            res.send({
                response:err.message
            })
        });

};