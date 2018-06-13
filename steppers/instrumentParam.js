var laasRepository=require("../db/laasRepository");
var logger = require("../utils/logger");
var responseUtil = require('../utils/responseUtil');
exports.getInstrumentType=function(req,res,next){

    logger.log('info',"inside instrumentParam--->"+res.locals.executeInstrumentParam);
    if(res.locals.executeInstrumentParam) {


        const txnTypeId = req.body.txntypeid;
        if(txnTypeId===undefined){
            logger.log('info',"error in getInstrumentType doesnot contain the required field txnTypeID");
            var response = responseUtil.createResponse('failure','E00002', req.body.txnno);
            res.send(response);
            return;
        }
        laasRepository.getInstrumentType(txnTypeId)
            .then((result)=>{
                logger.log('info',"in instrumentParam Result ------>>>>>"+ JSON.stringify(result));
                res.locals.instrumentParam = result[0];
            })
            .catch((err)=>{
                logger.log('error',"error in p_getTxnTypeIDRef  "+err.message);
                var response = responseUtil.createResponse('failure','D75100', req.body.txnno);
                res.send(response);
                return;
            });


    }
    next();
};