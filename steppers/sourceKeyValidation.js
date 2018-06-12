var laasRepository = require("../db/laasRepository");
var requestResponse=require("../utils/requestResponse");
var logger = require("../utils/logger");
var key=require("../utils/key");
var responseUtil = require('../utils/responseUtil');


exports.validateSourceKey = function (req, res, next) {
    logger.log('info',"inside source key validation");
    var apiSourceKey="";
    try {
        if(req.headers.api_source_key!==undefined){
            apiSourceKey = key.decrypt(req.headers.api_source_key);
        }
        else{
            logger.log('info',"error in source key validation doesnot contain the api_source_key");
            var response = responseUtil.createResponse('failure','E00002', req.body.txnno);
            res.send(response);
            return;
        }

    }
    catch(err){
        logger.log('error',"error in source key validation "+err.message);
        var response = responseUtil.createResponse('failure','E00004', req.body.txnno);
        res.send(response);
        return;
    }


    laasRepository.validateSourceKey(apiSourceKey)
        .then((result) => {
            logger.log('info',"in source key validation Result ------>>>>>"+ JSON.stringify(result));
            res.locals.sourceSystemId=result[0].returnCode;
            next();
        })
        .catch((err) => {
            logger.log('error',"error in p_validateSourceKey "+err.message);
            var response = responseUtil.createResponse('failure','E00004', req.body.txnno);
            res.send(response);
        });
};