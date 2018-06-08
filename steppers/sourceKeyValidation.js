var laasRepository = require("../db/laasRepository");
exports.validateSourceKey = function (req, res, next) {

    const apiSourceKey = req.headers.api_source_key;

    console.log("in steppers--> validate source key --> " + apiSourceKey);

    laasRepository.validateSourceKey(apiSourceKey)
        .then((result) => {
            console.log("Result ------>>>>> " + JSON.stringify(result));
            if (result[0].returnCode === 1234567890) {
                res.locals.sourceSystemId=result[0].returnCode;
                next();
            }
            else {
                res.send(401);
                res.send({
                        response : 'invalid api_source_key'
                    });
            }
        })
        .catch((err) => {
            res.status(400);
            res.send({
               response:"Error in p_validateSourceKey "+err.message
            });
            //res.error(err);
        });
};