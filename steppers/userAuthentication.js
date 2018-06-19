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
            username = key.decrypt(headerData.username, res.locals.sourceSystemId);
            password = key.decrypt(headerData.password, res.locals.sourceSystemId);
            pin = key.decrypt(headerData.pin, res.locals.sourceSystemId);
        }
        else{
            logger.log('info',"error in user authentication doesnot contain the mandatory fields");
            req.headers.statusCode="E00002";
            var response = responseUtil.createResponse('failure','E00002', req.body.txnno);
            res.send(response);
            return;
        }

    }
    catch(err){
        logger.log('error',"error in user authentication--> "+err.message);
        req.headers.statusCode="E00004";
        var response = responseUtil.createResponse('failure','E00004', req.body.txnno);
        res.send(response);
        return;
    }


    laasRepository.authenticateUsers(username,password,pin)
        .then((result)=>{
            logger.log('info',"in user authentication Result ------>>>>>"+ JSON.stringify(result));
            try{
                if(result[0].loginStatus===1){
                    next();
                }
                else{
                    logger.log('info',"in user authentication -->invalid username password ");
                    req.headers.statusCode="E00001";
                    var response = responseUtil.createResponse('failure','E00001', req.body.txnno);
                    res.send(response);
                }
            }
            catch(err){
                logger.log("error","couldn't get loginStatus in the result--->"+err.message);
                req.headers.statusCode="E00001";
                var response = responseUtil.createResponse('failure','E00001', req.body.txnno);
                res.send(response);
            }

        })
        .catch((err)=>{
            logger.log('error',"error in p_getSSOAuthenticationAPI "+err.message);
            req.headers.statusCode="D75201";
            var response = responseUtil.createResponse('failure','D75201', req.body.txnno);
            res.send(response);
        });

};