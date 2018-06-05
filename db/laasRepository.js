var db = require("../db/db");
var Q = require("q");

exports.validateData = function (laasData) {
    console.log("in database method name--> validateData");

    var isValid = db.connect("validateLaasData" + lassData);

    return isValid;

};

exports.validateSourceKey = function (api_source_key) {
    var defer = Q.defer();
    console.log("in database method name --> validate Source Key  " + api_source_key);
    db.connect("p_validateSourceKey " + api_source_key)
        .then((result) => {
            defer.resolve(result);
        })
        .catch((err) => {
            defer.reject(err);
        });
    return defer.promise;
};

exports.validateIP = function (request_ip) {
    console.log("in database method name -->  Validate IP  " + request_ip);
    var isValid = db.connect("validateIP");
    return isValid;
};

exports.authenticateUsers = function (username, password) {

    console.log("in database method name  --> authenticate Users  " + username + " " + password);
    var isValid = db.connect("validateUser");
    return isValid;
};

exports.getProductCode = function (txnTypeId) {
    console.log("in database method name  ---> get Product Code " + txnTypeId);
    var productCode = db.connect("product Code");
    return 1;
};

exports.getSPName = function (ssid, txnTypeId, productCode) {
    console.log("in database method name  ---> get SPName  " + txnTypeId);
    var SPName = db.connect("SP Name");
    return "XYZ";
};

exports.getParamters = function (ssid, txnTypeId, productCode) {

    console.log("in database method name  ---> get Parameters" + txnTypeId);
    var parameters = db.connect("SPParamter and API Parameter");

    return parameters;
};

exports.getInstrumentType = function (txnTypeId) {
    console.log("in database method name ---> getInstrumentType");
    var instrumentType = db.connect("instrumentType");
    return instrumentType;
};

exports.getPaymentMode = function (paymentModeRef) {
    console.log("in database method name  ---> get paymentMode" + paymentModeRef);
    var paymentMode = db.connect("paymentMode");
    return paymentMode;

};

exports.invokeSPParamter = function (spParameters) {
    console.log("in database method name --> invoke SPParameter procedure");
    var response = db.connect("invokeSPParamter");
    return response;
};

exports.invokeAllParameter = function (spParameters, laasData) {
    console.log("in database method name --> invoke ALLParameters procedure");
    var response = db.connect("invokeSPParamter");
    return response;
};