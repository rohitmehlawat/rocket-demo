var laasRepository=require("../db/laasRepository");
var logger = require("../utils/logger");
var responseUtil = require('../utils/responseUtil');
exports.getProductCode=function(req,res,next){

    logger.log('info',"inside getProductCode");
    const txnTypeId=req.body.txntypeid;
    if(txnTypeId===undefined){
        logger.log('info',"error in getProductCode doesnot contain the txnTypeId");
        var response = responseUtil.createResponse('failure','E00002', req.body.txnno);
        res.send(response);
        return;
    }
    laasRepository.getProductCode(txnTypeId)
        .then((result)=>{
            logger.log('info',"in getProductCode Result ------>>>>>"+ JSON.stringify(result));
            res.locals.productCode=result[0].ProductCode;
            next();
        })
        .catch((err)=>{

            logger.log('error',"error in p_getProductCode  "+err.message);
            var response = responseUtil.createResponse('failure','E00004', req.body.txnno);
            res.send(response);

        });

};