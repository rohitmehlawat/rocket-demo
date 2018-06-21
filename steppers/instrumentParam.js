var laasRepository=require("../db/laasRepository");
var logger = require("../utils/logger");
var responseUtil = require('../utils/responseUtil');
exports.getInstrumentType=function(req,res,next){

    logger.log('info',"inside instrumentParam--->"+res.locals.executeInstrumentParam);
    if(res.locals.executeInstrumentParam) {


        const txnTypeId = req.body.txntypeid;
        var SPParameters=res.locals.SPParameters;
        if(txnTypeId===undefined){
            logger.log('info',"error in getInstrumentType doesnot contain the required field txnTypeID");
            req.headers.statusCode="E00002";
            var response = responseUtil.createResponse('failure','E00002', req.body.txnno);
            res.send(response);
            return;
        }
        laasRepository.getInstrumentType(txnTypeId)
            .then((result)=>{
                logger.log('info',"in instrumentParam Result ------>>>>>"+ JSON.stringify(result));
                try{
                    var instrumentParam=result[0];
                    for(var key in instrumentParam){
                        SPParameters[key.trim()]=instrumentParam[key.trim()].trim();
                    }
                    res.locals.SPParameters=SPParameters;
                }
                catch(err){
                    logger.log("error","couldn't get instrument param from result -->"+err.message);
                }

            })
            .catch((err)=>{
                logger.log('error',"error in p_getTxnTypeIDRef  "+err.message);
                req.headers.statusCode="D75100";
                var response = responseUtil.createResponse('failure','D75100', req.body.txnno);
                res.send(response);
                return;
            });


    }
    next();
};