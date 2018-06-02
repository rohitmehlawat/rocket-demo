var express=require("express");
var requestIP=require("request-ip");

var laasDataService=require("../service/laasDataService");
var schemaValidator=require("../service/schemaValidator");
var router=express.Router();

exports.post=function(req,res){
    var laasData=req.body;
    var laasHeader=req.headers;

    var result=schemaValidator.validateSchema(laasData);

    if(result.valid){
        const reqIP=requestIP.getClientIp(req);
        var response=laasDataService.authenticate(laasHeader,reqIP);
        if(response===true){
            laasDataService.laasData(laasHeader.api_source_key,laasData.txntypeid);
            res.send("success");
        }
        else{
            res.send(response);
        }

    }
    else{
        res.send(result.errors);
    }


};