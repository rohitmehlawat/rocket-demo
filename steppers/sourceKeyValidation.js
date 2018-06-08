var laasRepository = require("../db/laasRepository");
var logger = require("../utils/logger");
exports.validateSourceKey = function (req, res, next) {

    const apiSourceKey = req.headers.api_source_key;


    logger.log('info',"in source key validation");

    laasRepository.validateSourceKey(apiSourceKey)
        .then((result) => {
            console.log("Result ------>>>>> " + JSON.stringify(result));
            res.locals.sourceSystemId=result[0].returnCode;
        })
        .catch((err) => {
            logger.log('err',"error in p_validateSourceKey "+err.message);
            res.status(400);
            res.send({
               response:"Error in p_validateSourceKey "+err.message
            });
        });
};