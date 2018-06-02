var db=require("../db/db");

exports.validateSourceKey=function(api_source_key){

    console.log("in database method name --> validate Source Key  "+api_source_key);
        var isValid=db.connect("validateSourceKey");
    return isValid;

};

exports.validateIP=function(request_ip){
    console.log("in database method name -->  Validate IP  "+request_ip);
    var isValid=db.connect("validateIP");
    return isValid;
};

exports.authenticateUsers=function(username,password){

    console.log("in database method name  --> authenticate Users  "+username+" "+password);
    var isValid=db.connect("validateUser");
    return isValid;
};

exports.getProductCode=function(txnTypeId){
    console.log("in database method name  ---> get Product Code "+txnTypeId);
    var productCode=db.connect("product Code");
    return 1;
};

exports.getSPName=function(txnTypeId){
    console.log("in database method name  ---> get SPName  "+txnTypeId);
    var productCode=db.connect("SP Name");
    return "XYZ";
};