var laasRepository=require("../db/laasRepository");
var requestIP=require("request-ip");
exports.validateIP=function(req,res,next) {

    console.log("in steppers --> validateIP method");
    const sourceSystemId=res.locals.sourceSystemId;
    const reqIP=requestIP.getClientIp(req); // getting client IP
    laasRepository.validateIP(sourceSystemId,reqIP)
        .then((result)=>{
            console.log("Result for IP----->"+JSON.stringify(result));
            if(result[0].ValdationStatus===1){
                next();
                /*res.send({
                    response:"success"
                });*/
            }
            else{
                res.status(401);
                res.send({
                    response:"request_ip_address is not authenticated"
                });
            }
        })
        .catch((err)=>{
           res.status(400);
           res.send({
               response:"Error in p_validateHostIP-->"+err.message
           });
        });
};