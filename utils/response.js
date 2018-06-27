var responseData=function(txnNo){
    return{
        "status":"success",
        "code":200,
        "messages":[],
        "result":{
            "txn":{
                "txnno":txnNo
            }
        }
    };


};
module.exports=responseData;