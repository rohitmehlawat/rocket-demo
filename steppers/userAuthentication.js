var laasRepository=require("../db/laasRepository");
exports.authenticateUser=function(req,res,next) {
    const headerData=req.headers;
    const userName=headerData.username;
    const password=headerData.password;
    const pin=headerData.pin;

    console.log("in steppers --> authenticate user method");

    laasRepository.authenticateUsers(userName,password,pin)
        .then((result)=>{
            if(result[0].loginStatus===1){
                next();
            }
            else{
                res.status(401);
                res.send("invalid username password");
            }
        })
        .catch((err)=>{
            console.log("error of steppers--->"+err);
            res.status(400);
            res.send({
               response:err.message
            });
        });

};