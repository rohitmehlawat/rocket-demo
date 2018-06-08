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
    logger.log('info',"inside repository validate source key");
    var defer = Q.defer();
    console.log("in database method name --> validate Source Key  " + api_source_key);
    db.connect("p_validateSourceKey " + api_source_key)
        .then((result) => {
            logger.log('info',"inside repository validate source key Result---->"+JSON.stringify(result));
            console.log(" Result ------------" + result);
            defer.resolve(result);
        })
        .catch((err) => {
            logger.log('err',"inside repository error validate source key");
            defer.reject(err);
        });
    return defer.promise;
};

exports.validateIP = function (sourceSystemId,request_ip) {
    var defer=Q.defer();
    console.log("in database method name -->  Validate IP  " + request_ip);
    db.connect("p_validateHostIP "+sourceSystemId+",'"+request_ip+"'")
        .then((result)=>{
            defer.resolve(result);
        })
        .catch((err)=>{
            console.log("in error of repo"+err);
            defer.reject(err);
        });
    return defer.promise;
};

exports.authenticateUsers = function (username, password,pin) {
    var defer=Q.defer();
    console.log("in database method name  --> authenticate Users  " + username + " " + password);
    db.connect("p_getSSOAuthenticationAPI '"+username+"', '"+password+"','"+pin+"'")
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
    db.connect("p_getProductCode "+ txnTypeId)
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
    db.connect("p_getSPName "+ssid +","+ productCode+"," + txnTypeId)
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
    db.connect("p_getTxnParamMapper"+ssid+","+productCode+","+txnTypeId)
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
    db.connect("p_getTxnTypeIDRef "+txnTypeId)
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
    db.connect("p_getPaymenetModeIDRef "+paymentModeRef)
        .then((result)=>{
            defer.resolve(result);
        })
        .catch((err)=>{
            defer.reject(err);
        });
    return defer.promise;

};

exports.invokeSPParamter = function (SPName,SPParameters,instrumentType,productCode,paymentMode) {
    var defer=Q.defer();
    console.log("in database method name --> invoke SPParameter procedure");
    db.connect(SPName+" "+SPParameters+","+instrumentType+","+productCode+","+paymentMode)
        .then((result)=>{
            defer.resolve(result);
        })
        .catch((err)=>{
            defer.reject(err);
        });

    return defer.promise;
};

exports.invokeAllParameter = function (spName, spParameters) {
    var defer=Q.defer();
    console.log("in database method name --> invoke ALLParameters procedure");
    db.connect(spName +" "+ spParameters)
        .then((result)=>{
           defer.resolve(result);
        })
        .catch((err)=>{
            defer.reject(err);
        });

    return defer.promise;
};