var laasRepository=require("../db/laasRepository");
var requestIP=require("request-ip");
var logger = require("../utils/logger");
exports.validateIP=function(req,res,next) {

    logger.log('info',"inside ip validation");
    const ssid=res.locals.sourceSystemId;
    const reqIP=requestIP.getClientIp(req); // getting client IP
    laasRepository.validateIP(ssid,reqIP)
        .then((result)=>{
            logger.log('info',"in ip validation Result ------>>>>>"+ JSON.stringify(result));
            if(result[0].ValdationStatus===1){
                next();
            }
            else{
                logger.log('info',"in ip validation --> request_ip_address is not authenticated ");
                res.status(400);
                res.send({
                    response:"request_ip_address is not authenticated"
                });
            }
        })
        .catch((err)=>{
            logger.log('error',"error in p_validateHostIP "+err.message);
            res.status(400);
            res.send({
               response:"Error in p_validateHostIP-->"+err.message
           });
        });
};