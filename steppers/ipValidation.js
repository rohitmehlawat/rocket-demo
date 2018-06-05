var laasRepository=require("../db/laasRepository");
var requestIP=require("request-ip");
exports.validateIP=function(req,res,next) {

    console.log("in steppers --> validateIP method");

    const reqIP=requestIP.getClientIp(req); // getting client IP
    var isValidIP=laasRepository.validateIP(reqIP);
    if(isValidIP===true) {
        next();
    }
    else {
        res.send("request_ip_address is not authenticated");
    }


};