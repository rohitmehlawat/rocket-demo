var laasRepository=require("../db/laasRepository");
var logger = require("../utils/logger");
var responseUtil = require('../utils/responseUtil');
exports.getProductCode=function(req,res,next){

    logger.log('info',"inside getProductCode");
    const txnTypeId=req.body.txntypeid;
    if(txnTypeId===undefined){
        logger.log('info',"error in getProductCode doesnot contain the txnTypeId");
        req.headers.statusCode="E00002";
        var response = responseUtil.createResponse('failure','E00002', req.body.txnno);
        res.send(response);
        return;
    }
    laasRepository.getProductCode(txnTypeId)
        .then((result)=>{
            logger.log('info',"in getProductCode Result ------>>>>>"+ JSON.stringify(result));
            try{
                res.locals.productCode=result[0].ProductCode;
            }
            catch(err){
                logger.log("error","couldn't get the product code from the result-->"+err.message);
            }
            next();
        })
        .catch((err)=>{

            logger.log('error',"error in p_getProductCode  "+err.message);
            req.headers.statusCode="D75100";
            var response = responseUtil.createResponse('failure','D75100', req.body.txnno);
            res.send(response);

        });

};