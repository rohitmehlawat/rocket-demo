var express=require("express");

var steppers = require('../steppers');

exports.post=function(url, app){

    app.use(url,steppers.schemaValidator.validateSchema);

    app.use(url,steppers.sourceKeyValidation.validateSourceKey);

    app.use(url,steppers.ipValidation.validateIP);

	app.use(url,steppers.userAuthentication.authenticateUser);

    app.use(url,steppers.productCode.getProductCode);

    app.use(url,steppers.spName.getSPName);

    app.use(url,steppers.parameters.getSPParamters);

    app.use(url,steppers.spParameter.setSPParameter);

    app.use(url,steppers.apiParameter.checkAPIParameter);

    app.use(url,steppers.instrumentParam.getInstrumentType);

    app.use(url,steppers.paymentMode.getPaymentMode);

    app.use(url,steppers.invokeSPParameter.invokeSPParameter);

};