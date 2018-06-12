var db = require("./db");
var Q = require("q");
var logger = require("../utils/logger");
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
    db.connect("p_validateSourceKey " + api_source_key)
        .then((result) => {
            defer.resolve(result);
        })
        .catch((err) => {
            defer.reject(err);
        });
    return defer.promise;
};

exports.validateIP = function (sourceSystemId,request_ip) {
    logger.log('info',"inside repository validateIP");
    var defer=Q.defer();
    db.connect("p_validateHostIP "+sourceSystemId+",'"+request_ip+"'")
        .then((result)=>{
            defer.resolve(result);
        })
        .catch((err)=>{
            defer.reject(err);
        });
    return defer.promise;
};

exports.authenticateUsers = function (username, password,pin) {
    logger.log('info',"inside repository authenticateUser");
    var defer=Q.defer();

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
    logger.log('info',"inside repository getProductCode");

    var defer=Q.defer();

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
    logger.log('info',"inside repository getSPName");

    var defer=Q.defer();
    db.connect("p_getSPName "+ssid +","+ productCode+"," + txnTypeId)
        .then((result)=>{
            defer.resolve(result);
        })
        .catch((err)=>{
            defer.reject(err);
        });
    return defer.promise;
};

exports.getParameters = function (ssid, txnTypeId, productCode) {
    logger.log('info',"inside repository getParameters");

    var defer=Q.defer();

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
    logger.log('info',"inside repository getInstrumentType");

    var defer=Q.defer();

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
    logger.log('info',"inside repository getPaymentMode");

    var defer=Q.defer();

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

    db.connect(spName +" "+ spParameters)
        .then((result)=>{
           defer.resolve(result);
        })
        .catch((err)=>{
            defer.reject(err);
        });

    return defer.promise;
};

exports.logRequestResponse=(requestResponseData)=>{
  var defer=Q.defer();
  db.connect("p_logRequestResponse "+requestResponseData.getData("requestTime")+","+requestResponseData.getData("responseTime")+","+requestResponseData.getData("hostIp")+","+requestResponseData.getData("ssid")+","+requestResponseData.getData("txnTypeId")+","+requestResponseData.getData("txnNo")+","+requestResponseData.getData("responseCode")+","+requestResponseData.getData("responseStatus"))
      .then((result)=>{
          defer.resolve(result);
      })
      .catch((err)=>{
          defer.reject(err);
      });
  return defer.promise;


};