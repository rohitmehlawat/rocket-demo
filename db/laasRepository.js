var db = require("./db");
var Q = require("q");

exports.validateData = function (laasData) {
    var defer=Q.defer();
    console.log("in database method name--> validateData");

    db.connect("validateLaasData " + laasData)
        .then((result)=>{
           defer.resolve(result);
        })
        .catch((err)=>{
            defer.reject(err);
        });

    return defer.promise;

};

exports.validateSourceKey = function (api_source_key) {
    var defer = Q.defer();
    console.log("in database method name --> validate Source Key  " + api_source_key);
    db.connect("p_validateSourceKey " + api_source_key)
        .then((result) => {
            console.log(" Result ------------" + result);
            defer.resolve(result);
        })
        .catch((err) => {

            console.log( "  Errorroro ------- " + err);
            defer.reject(err);
        });
    return defer.promise;
};

exports.validateIP = function (request_ip) {
    var defer=Q.defer();
    console.log("in database method name -->  Validate IP  " + request_ip);
    db.connect("validateIP "+request_ip)
        .then((result)=>{
            defer.resolve(result);
        })
        .catch((err)=>{
            defer.reject(err);
        });
    return defer.promise;
};

exports.authenticateUsers = function (username, password) {
    var defer=Q.defer();
    console.log("in database method name  --> authenticate Users  " + username + " " + password);
    db.connect("validateUser")
        .then((result)=>{
            defer.resolve(result);
        })
        .catch((err)=>{
            defer.reject(err);
        });
    return defer.promise;
};

exports.getProductCode = function (txnTypeId) {
    var defer=Q.defer();
    console.log("in database method name  ---> get Product Code " + txnTypeId);
    db.connect("productCode"+ txnTypeId)
        .then((result)=>{
            defer.resolve(result);
        })
        .catch((err)=>{
           defer.reject(err);
        });
    return defer.promise;
};

exports.getSPName = function (ssid, txnTypeId, productCode) {
    var defer=Q.defer();
    console.log("in database method name  ---> get SPName  " + txnTypeId);
    db.connect("SPName "+ssid +" "+ txnTypeId+" " + productCode)
        .then((result)=>{
            defer.resolve(result);
        })
        .catch((err)=>{
            defer.reject(err);
        });
    return defer.promise;
};

exports.getParamters = function (ssid, txnTypeId, productCode) {
    var defer=Q.defer();
    console.log("in database method name  ---> get Parameters" + txnTypeId);
    db.connect("SPParamter and API Parameter")
        .then((result)=>{
            defer.resolve(result);
        })
        .catch((err)=>{
            defer.reject(err);
        });

    return defer.promise;
};

exports.getInstrumentType = function (txnTypeId) {
    var defer=Q.defer();
    console.log("in database method name ---> getInstrumentType");
    db.connect("instrumentType "+txnTypeId)
        .then((result)=>{
            defer.resolve(result);
        })
        .catch((err)=>{
            defer.reject(err);
        });
    return defer.promise;
};

exports.getPaymentMode = function (paymentModeRef) {
    var defer=Q.defer();
    console.log("in database method name  ---> get paymentMode" + paymentModeRef);
    db.connect("paymentMode "+paymentModeRef)
        .then((result)=>{
            defer.resolve(result);
        })
        .catch((err)=>{
            defer.reject(err);
        });
    return defer.promise;

};

exports.invokeSPParamter = function (spParameters,instrumentParam,paymentMode) {
    var defer=Q.defer();
    console.log("in database method name --> invoke SPParameter procedure");
    db.connect("invokeSPParamter "+ spParameters +" "+ instrumentParam+ " "+paymentMode)
        .then((result)=>{
            defer.resolve(result);
        })
        .catch((err)=>{
            defer.reject(err);
        });

    return defer.promise;
};

exports.invokeAllParameter = function (spParameters, laasData) {
    var defer=Q.defer();
    console.log("in database method name --> invoke ALLParameters procedure");
    db.connect("invokeSPParamter "+ spParameters +" "+laasData)
        .then((result)=>{
           defer.resolve(result);
        })
        .catch((err)=>{
            defer.reject(err);
        });

    return defer.promise;
};