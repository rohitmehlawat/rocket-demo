var laasRepsoitory=require("../db/laasRepository");
var RequestResponse=require("../model/RequestResponse");
var logger=require("../utils/logger");

exports.requestResponseLog=(req,res)=>{

    logger.log("info","inside request Response");
    var requestResponseData=new RequestResponse();
    requestResponseData.setData("requestTime","");
    requestResponseData.setData("responseTime","");
    requestResponseData.setData("hostIP","");
    requestResponseData.setData("ssid","");
    requestResponseData.setData("txnTypeId","");
    requestResponseData.setData("txnNo","");
    requestResponseData.setData("responseCode","");
    requestResponseData.setData("responseStatus","");



    laasRepsoitory.logRequestResponse(requestResponseData)
        .then((result)=>{
            return "success";
        })
        .catch((err)=>{

            logger.log("error","error p_logRequestResponse "+err.message);
            return "failure";

        });


};

