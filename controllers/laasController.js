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

    app.use(schemaValidator.validateSchema);

    app.use(dataValidation.validateData);

    app.use(sourceKeyValidation.validateSourceKey);

    app.use(ipValidation.validateIP);

    app.use(userAuthentication.authenticateUser);

    app.use(productCode.getProductCode);

    app.use(spName.getSPName);

    app.use(parameters.getSPParamters);

    app.use(spParameter.setSPParameter);

    app.use(apiParameter.checkAPIParameter);

    app.use(instrumentParam.getInstrumentType);

    app.use(paymentMode.getPaymentMode);

    app.use(invokeSPParameter.invokeSPParameter);

    app.use(invokeAllParameter.invokeAllParameter);








};