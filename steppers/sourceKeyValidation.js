var laasRepository = require("../db/laasRepository");
var requestResponse=require("../utils/requestResponse");
var logger = require("../utils/logger");
var key=require("../utils/key");
var responseUtil = require('../utils/responseUtil');

exports.validateSourceKey = function (req, res, next) {
    logger.log('info',"inside source key validation");

    const apiSourceKey="key.decrypt(req.headers.api_source_key)";

    laasRepository.validateSourceKey(apiSourceKey)
        .then((result) => {
            logger.log('info',"in source key validation Result ------>>>>>"+ JSON.stringify(result));
            res.locals.sourceSystemId=result[0].returnCode;
            next();
        })
        .catch((err) => {
            console.log(err +  " ----------------------------------llllllll")
            //var response=requestResponse.requestResponseLog(req,res);
            logger.log('error',"error in p_validateSourceKey "+err.message);
            res.status(400);
            // res.send({
            //    response:"Error in p_validateSourceKey "+err.message
            // });
            res.send(responseUtil.createResponse('failure','E00004', req.body.txnno));
        });
};