var laasRepository=require("../db/laasRepository");
var logger = require("../utils/logger");
var responseUtil = require('../utils/responseUtil');
exports.getSPName=function(req,res,next){

    logger.log('info',"inside getSPName");

    const productCode=res.locals.productCode;

    const ssid=res.locals.sourceSystemId;

    const txnTypeId=req.body.txntypeid;
    if(productCode===undefined || ssid===undefined || txnTypeId===undefined){
        logger.log('info',"error in getSPName doesnot contain the required fields");
        var response = responseUtil.createResponse('failure','E00002', req.body.txnno);
        res.send(response);
        return;
    }

    laasRepository.getSPName(ssid,txnTypeId,productCode)
        .then((result)=>{
            logger.log('info',"in getSPName Result ------>>>>>"+ JSON.stringify(result));
            res.locals.SPName=result[0].SPName;
            next();
        })
        .catch((err)=>{
            logger.log('error',"error in p_getSPName  "+err.message);
            var response = responseUtil.createResponse('failure','E00004', req.body.txnno);
            res.send(response);

        });




};