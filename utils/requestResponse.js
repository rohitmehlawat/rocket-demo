var laasRepsoitory=require("../db/laasRepository");
var logger=require("logger");

exports.requestResponseLog=(req,res)=>{

    logger.log("info","inside request Response");


    laasRepsoitory.logRequestResponse()
        .then((result)=>{

        })
        .catch((err)=>{

            logger.log("error","error p_logRequestResponse "+err.message);

        });


};