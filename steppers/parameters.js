var laasRepository=require("../db/laasRepository");
var logger = require("../utils/logger");
var requestResponse=require("../utils/requestResponse");
exports.getSPParamters=function(req,res,next){

    logger.log('info',"inside getSPParameters");

    const productCode=res.locals.productCode;

    const ssid=res.locals.sourceSystemId;

    const txnTypeId=req.body.txntypeid;

    laasRepository.getParameters(ssid,txnTypeId,productCode)
        .then((result)=>{
            logger.log('info',"in getSPParameters Result ------>>>>>"+ JSON.stringify(result));
            res.locals.parameters=result;
            next();
        })
        .catch((err)=>{
            var response=requestResponse.requestResponseLog(req,res);
            logger.log('error',"error in p_getTxnParamMapper  "+err.message);
            res.status(400);
            res.send({
                response:err.message
            });
        });




};