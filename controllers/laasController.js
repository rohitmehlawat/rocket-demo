var express=require("express");

var schemaValidator=require("../steppers/schemaValidator");

var dataValidation=require("../steppers/dataValidation");
var sourceKeyValidation=require("../steppers/sourceKeyValidation");
var ipValidation=require("../steppers/ipValidation");
var userAuthentication=require("../steppers/userAuthentication");
var productCode=require("../steppers/productCode");
var spName=require("../steppers/spName");
var parameters=require("../steppers/parameters");
var instrumentParam=require("../steppers/instrumentParam");
var spParameter=require("../steppers/spParameter");

var apiParameter=require("../steppers/ApiParameter");

var paymentMode=require("../steppers/paymentMode");

var invokeSPParameter=require("../steppers/invokeSPParameter");

var invokeAllParameter=require("../steppers/invokeAllParameter");


var responseData=require("../utils/response");

exports.post=function(url, app){

    app.use(url,schemaValidator.validateSchema);

    //app.use(dataValidation.validateData);

    app.use(url,sourceKeyValidation.validateSourceKey);

    app.use(url,ipValidation.validateIP);

    app.use(url,userAuthentication.authenticateUser);

    app.use(url,productCode.getProductCode);

    app.use(url,spName.getSPName);

    app.use(url,parameters.getSPParamters);

    app.use(url,spParameter.setSPParameter);

    app.use(url,apiParameter.checkAPIParameter);

    app.use(url,instrumentParam.getInstrumentType);

    app.use(url,paymentMode.getPaymentMode);

    app.use(url,invokeSPParameter.invokeSPParameter);

    app.use(url,invokeAllParameter.invokeAllParameter);








};