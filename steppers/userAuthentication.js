var laasRepository=require("../db/laasRepository");
exports.authenticateUser=function(req,res,next) {
    const headerData=req.headers;
    const userName=headerData.username;
    const password=headerData.password;

    console.log("in steppers --> authenticate user method");

    laasRepository.authenticateUsers(userName,password)
        .then((result)=>{
            if(result[0].returnCode=='True'){
                next();
            }
            else{
                res.send("invalid username password");
            }
        })
        .catch((err)=>{

        });

};