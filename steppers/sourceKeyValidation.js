var laasRepository=require("../db/laasRepository");
exports.validateSourceKey=function(req,res,next) {

    const apiSourceKey = req.headers.api_source_key;

    console.log("in steppers--> validate source key --> " + apiSourceKey);

    var isSourceKey = laasRepository.validateSourceKey(apiSourceKey, (result) => {

        console.log("Result ------>>>>> " + result);
        if (result =='True') {
            res.send("success");
        }
        else {
            res.send("api_source_key is invalid");
        }
    });
};