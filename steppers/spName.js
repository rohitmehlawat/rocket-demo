var laasRepository=require("../db/laasRepository");
var logger = require("../utils/logger");
exports.getSPName=function(req,res,next){

    logger.log('info',"inside getSPName");

    const productCode=res.locals.productCode;

    const ssid=res.locals.sourceSystemId;

    const txnTypeId=req.body.txntypeid;

    laasRepository.getSPName(ssid,txnTypeId,productCode)
        .then((result)=>{
            logger.log('info',"in getSPName Result ------>>>>>"+ JSON.stringify(result));
            res.locals.SPName=result[0].SPName;
            next();
        })
        .catch((err)=>{
            logger.log('error',"error in p_getSPName  "+err.message);
            res.status(400);
            res.send({
               response:err.message
            });

        });




};