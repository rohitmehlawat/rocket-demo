var laasRepository = require("../db/laasRepository");
var logger = require("../utils/logger");
var key=require("../utils/key");
exports.validateSourceKey = function (req, res, next) {
    logger.log('info',"inside source key validation");

    const apiSourceKey=key.decrypt(req.headers.api_source_key);

    laasRepository.validateSourceKey(apiSourceKey)
        .then((result) => {
            logger.log('info',"in source key validation Result ------>>>>>"+ JSON.stringify(result));
            res.locals.sourceSystemId=result[0].returnCode;
        })
        .catch((err) => {
            logger.log('error',"error in p_validateSourceKey "+err.message);
            res.status(400);
            res.send({
               response:"Error in p_validateSourceKey "+err.message
            });
        });
};