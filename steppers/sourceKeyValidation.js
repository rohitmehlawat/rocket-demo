var laasRepository = require("../db/laasRepository");
exports.validateSourceKey = function (req, res, next) {

    const apiSourceKey = req.headers.api_source_key;

    console.log("in steppers--> validate source key --> " + apiSourceKey);

    laasRepository.validateSourceKey(apiSourceKey)
        .then((result) => {
            console.log("Result ------>>>>> " + result);
            if (result[0].returnCode == 'True') {
                next();
            }
            else {
                res.send("api_source_key is invalid");
            }
        })
        .catch((err) => {

        });
};