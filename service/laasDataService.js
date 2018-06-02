var laasRepository=require("../db/laasRepository");

exports.authenticate=function(headerData,request_ip){

    console.log("in service-->"+headerData.api_source_key);

    var isSourceKey=laasRepository.validateSourceKey(headerData.api_source_key);

    if(isSourceKey===true){

        var isValidIP=laasRepository.validateIP(request_ip);
        if(isValidIP===true){

            var isUserValid=laasRepository.authenticateUsers(headerData.username,headerData.password);

            if(isUserValid===true){

                return true;
            }
            else{
                return "username is not authenticated";
            }

        }
        else{
            return "request_ip_address is not authenticated";
        }
    }
    else{
        return "api_source_key is invalid";
    }

};

exports.laasData=function(api_source_key,txnTypeId){

    var productCode=laasRepository.getProductCode(txnTypeId);
    var SPName=laasRepository.getSPName(txnTypeId,productCode);


};

