var  Validator=require("jsonschema").Validator;
var laasSchema=require("../schema/laasSchema");
var currency=require("../schema/currency");
var sender=require("../schema/sender");
var receiver=require("../schema/receiver");
var charges=require("../schema/charges");
var othertxnInfo=require("../schema/othertxnInfo");
//var cheque=require("../schema/cheque");

exports.validateSchema=function(req,res,next){

    var  laasData=req.body;

    var schemaValidator=new Validator();
    schemaValidator.addSchema(currency,'/currency');
    schemaValidator.addSchema(sender,"/sender");
    schemaValidator.addSchema(receiver,"/receiver");
    schemaValidator.addSchema(charges,"/charges");
    schemaValidator.addSchema(othertxnInfo,"/othertxnInfo");
    //schemaValidator.addSchema(cheque,"/cheque");

    var result=schemaValidator.validate(laasData,laasSchema);

    if(result.valid){
        next();
    }
    else{
        res.send(result.errors);
    }
};