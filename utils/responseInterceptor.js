const interceptor = require('express-interceptor');
const responseUtil = require('../utils/responseUtil');

module.exports = interceptor(function(req, res){
    
    return {
      isInterceptable: function(){
        return true;
      },
      
      intercept: function(body, send) {
          console.log("rereretrtterwe");
          console.log(interceptResponse(body));
        res.json(interceptResponse(body));
        res.send();
      }
    };
    
    function interceptResponse(body){
        var status = body.status;
        var code = body.code;
        var messages = responseUtil.getDescriptionForResCode(responseUtil.ResponseCodeEnum[code]);
        var txnno = body.txnno;
        var response = {
            status: status,
            code: code,
            messages: [{
                messages
            }],
            result: {
                txn: {
                    txnno: txnno
                }
            }
        }
        return response;
    }
  });