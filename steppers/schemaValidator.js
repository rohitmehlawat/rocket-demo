var  Validator=require("jsonschema").Validator;
var laasSchema=require("../schema/laasSchema");
var currency=require("../schema/currency");
var sender=require("../schema/sender");
var receiver=require("../schema/receiver");
var charges=require("../schema/charges");
var othertxnInfo=require("../schema/othertxnInfo");
var logger = require("../utils/logger");
const http = require("../utils/http");

exports.validateSchema=function(req,res,next){

    logger.log('info','inside Validate Schema');
    var request = {
        "txnno": "12345",
        "paymentstatus": 1,
        "reason": "Accepted"
    }
    
    http.post('http://demo7999608.mockable.io','/clientAck',request)
    .then((result) => {
        console.log("Result   ---- " + JSON.stringify(result))
    })
    .catch((error) => {
        console.log("Error   ---- " + error)
    })


    var  laasData=req.body;

    var schemaValidator=new Validator();
    schemaValidator.addSchema(currency,'/currency');
    schemaValidator.addSchema(sender,"/sender");
    schemaValidator.addSchema(receiver,"/receiver");
    schemaValidator.addSchema(charges,"/charges");
    schemaValidator.addSchema(othertxnInfo,"/othertxnInfo");

    var result=schemaValidator.validate(laasData,laasSchema);

    if(result.valid){
        next();
    }
    else{
        logger.log('error',"error in validate Schema "+result.errors);
        res.send(result.errors);
    }
};