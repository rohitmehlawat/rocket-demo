var laasRepository=require("../db/laasRepository");
var logger = require("../utils/logger");
var requestResponse=require("../utils/requestResponse");
exports.getInstrumentType=function(req,res,next){

    logger.log('info',"inside instrumentParam--->"+res.locals.executeInstrumentParam);
    if(res.locals.executeInstrumentParam) {


        const txnTypeId = req.body.txntypeid;


        laasRepository.getInstrumentType(txnTypeId)
            .then((result)=>{
                logger.log('info',"in instrumentParam Result ------>>>>>"+ JSON.stringify(result));
                res.locals.instrumentParam = result[0];
            })
            .catch((err)=>{
                var response=requestResponse.requestResponseLog(req,res);
                logger.log('error',"error in p_getTxnTypeIDRef  "+err.message);
                res.status(400);
                res.send({
                    response:err.message
                });
            });


    }
    next();
};