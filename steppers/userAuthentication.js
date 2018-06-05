var laasRepository=require("../db/laasRepository");
exports.authenticateUser=function(req,res,next) {
    const headerData=req.headers;
    const userName=headerData.username;
    const password=headerData.password;

    console.log("in steppers --> authenticate user method");

    var isUserValid=laasRepository.authenticateUsers(userName,password);
    if(isUserValid===true) {
        next();
    }
    else {
        res.send("invalid username password");
    }


};