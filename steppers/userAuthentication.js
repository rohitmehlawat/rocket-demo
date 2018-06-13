var laasRepository=require("../db/laasRepository");
var logger = require("../utils/logger");
var key=require("../utils/key");
var responseUtil = require('../utils/responseUtil');
exports.authenticateUser=function(req,res,next) {

    logger.log('info',"inside user authentication");

    const headerData=req.headers;
    var username;
    var password;
    var pin;
    try {
        if(headerData.username!==undefined && headerData.password!==undefined && headerData.pin!==undefined){
            username = key.decrypt(headerData.username);
            password = key.decrypt(headerData.password);
            pin = key.decrypt(headerData.pin);
        }
        else{
            logger.log('info',"error in user authentication doesnot contain the mandatory fields");
            var response = responseUtil.createResponse('failure','E00002', req.body.txnno);
            res.send(response);
            return;
        }

    }
    catch(err){
        logger.log('error',"error in user authentication--> "+err.message);
        var response = responseUtil.createResponse('failure','E00004', req.body.txnno);
        res.send(response);
        return;
    }


    laasRepository.authenticateUsers(username,password,pin)
        .then((result)=>{
            logger.log('info',"in user authentication Result ------>>>>>"+ JSON.stringify(result));

            if(result[0].loginStatus===1){
                next();
            }
            else{
                logger.log('info',"in user authentication -->invalid username password ");
                var response = responseUtil.createResponse('failure','E00001', req.body.txnno);
                res.send(response);
            }
        })
        .catch((err)=>{
            logger.log('error',"error in p_getSSOAuthenticationAPI "+err.message);
            var response = responseUtil.createResponse('failure','D75201', req.body.txnno);
            res.send(response);
        });

};