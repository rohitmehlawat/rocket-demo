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
                    for(var i=0;i<SPParameters.length;i++ ){
						logger.log("info","parameter --->"+JSON.stringify(SPParameters[i]));
						if(SPParameters[i].hasOwnProperty("InstrumentType")){
							SPParameters[i].InstrumentType=instrumentParam.InstrumentType;							
							logger.log("info","instrument type parameter set--->"+SPParameters[i].InstrumentType);
							
						}
						else if(SPParameters[i].hasOwnProperty("TxnType")){
							SPParameters[i].TxnType=instrumentParam.TxnType;							
							logger.log("info","TxnType parameter set--->"+SPParameters[i].TxnType);
							
						}
						else if(SPParameters[i].hasOwnProperty("TxnMode")){
							SPParameters[i].TxnMode=instrumentParam.TxnMode;							
							logger.log("info","TxnMode parameter set--->"+SPParameters[i].TxnMode);
							
						}
					}
					
                    res.locals.SPParameters=SPParameters;
                }
                catch(err){
                    logger.log("error","couldn't get instrument param from result -->"+err.message);
                }
				next();

            })
            .catch((err)=>{
                logger.log('error',"error in p_getTxnTypeIDRef  "+err.message);
                req.headers.statusCode="D75100";
                var response = responseUtil.createResponse('failure','D75100', req.body.txnno);
                res.send(response);
                return;
            });


    }
	else{
		next();
	}
	
    
};