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
        req.headers.statusCode="E00002";
        var response = responseUtil.createResponse('failure','E00002', req.body.txnno);
        res.send(response);
        return;
    }

    laasRepository.getSPName(ssid,txnTypeId,productCode)
        .then((result)=>{
            logger.log('info',"in getSPName Result ------>>>>>"+ JSON.stringify(result));
            try{
                res.locals.SPName=result[0].SPName;

            }
            catch(err){
                logger.log("error","couldn't get SP Name from the result-->"+err.message);
            }
            next();

        })
        .catch((err)=>{
            logger.log('error',"error in p_getSPName  "+err.message);
            req.headers.statusCode="D75201";
            var response = responseUtil.createResponse('failure','D75201', req.body.txnno);
            res.send(response);

        });




};