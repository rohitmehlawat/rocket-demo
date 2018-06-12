var laasRepository=require("../db/laasRepository");
var logger = require("../utils/logger");
var key=require("../utils/key");
var requestResponse=require("../utils/requestResponse");
exports.authenticateUser=function(req,res,next) {

    logger.log('info',"inside user authentication");

    const headerData=req.headers;
    const userName=key.decrypt(headerData.username);
    const password=key.decrypt(headerData.password);
    const pin=key.decrypt(headerData.pin);



    laasRepository.authenticateUsers(userName,password,pin)
        .then((result)=>{
            logger.log('info',"in user authentication Result ------>>>>>"+ JSON.stringify(result));

            if(result[0].loginStatus===1){
                next();
            }
            else{
                var response=requestResponse.requestResponseLog(req,res);
                logger.log('info',"in user authentication -->invalid username password ");
                res.status(401);
                res.send("invalid username password");
            }
        })
        .catch((err)=>{
            var response=requestResponse.requestResponseLog(req,res);
            logger.log('error',"error in p_getSSOAuthenticationAPI "+err.message);
            res.status(400);
            res.send({
               response:err.message
            });
        });

};