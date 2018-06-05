var laasRepository=require("../db/laasRepository");
var requestIP=require("request-ip");
exports.validateIP=function(req,res,next) {

    console.log("in steppers --> validateIP method");

    const reqIP=requestIP.getClientIp(req); // getting client IP
    laasRepository.validateIP(reqIP)
        .then((result)=>{
            if(result[0].returnCode=='True'){
                next();
            }
            else{
                res.send("request_ip_address is not authenticated");
            }
        })
        .catch((err)=>{

        });
};