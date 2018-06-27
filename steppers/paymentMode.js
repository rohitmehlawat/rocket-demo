var laasRepository=require("../db/laasRepository");
var logger = require("../utils/logger");
var responseUtil = require('../utils/responseUtil');
exports.getPaymentMode=function(req,res,next){

    logger.log('info',"inside paymentMode--->"+res.locals.executeInstrumentParam);
    if(res.locals.executeInstrumentParam) {

        var SPParamters=res.locals.SPParameters;
        var chargesObj = req.body.charges;
        if(chargesObj===undefined){
            logger.log('error',"error in getPaymentMode, doesnot contain the required field paymentModeRef");
            req.headers.statusCode="E00002";
            var response = responseUtil.createResponse('failure','E00002', req.body.txnno);
            res.send(response);
            return;
        }
        laasRepository.getPaymentMode()
            .then((result) => {
                logger.log('info', "in paymentMode Result ------>>>>>" + JSON.stringify(result));
                try {
                    var paymentModeID=0;
					for(var i=0;i<result.length;i++){
						const key=result[i].PaymentModeParam.trim();
						logger.log("info","key in paymentModeParam-->"+key);
                        if(chargesObj.hasOwnProperty(key)){						
                            if(chargesObj[key]>0){
                                paymentModeID=result[i].PaymentModeID;
								logger.log("info","paymentModeId--->"+paymentModeID+" key-->"+key+" chargesObj[key]-->"+chargesObj[key]);
                                break;
                            }
                        }
					}
					logger.log("info","paymentModeID-->"+paymentModeID);
					logger.log("info","SPParameters in Payment Mode-->"+JSON.stringify(SPParamters));
					for(var i=0;i<SPParamters.length;i++ ){
						logger.log("info","parameter --->"+JSON.stringify(SPParamters[i]));
						if(SPParamters[i].hasOwnProperty("PaymentModeID")){
							SPParamters[i].PaymentModeID=paymentModeID;							
							logger.log("info","paymentModeID parameter set--->"+SPParamters[i].PaymentModeID);
							break;
						}
					}
                    res.locals.SPParameters = SPParamters;
					logger.log("info","SPParamters after payment Mode --->"+JSON.stringify(SPParamters));
                }
                catch (err) {
                    logger.log("error", "couldn't get payment param from result -->" + err.message);
                }
				next();
            })
            .catch((err) => {
                logger.log('error', "error in p_getPaymentModeIDRef  " + err.message);
                req.headers.statusCode = "D75100";
                var response = responseUtil.createResponse('failure', 'D75100', req.body.txnno);
                res.send(response);
                return;
            });
    }
	else{
			next();
	}
  
};