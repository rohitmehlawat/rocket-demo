

var laasSchema={
    "id":"/txnpush",
    "type":"object",
    "properties":{
        "txnno":{"type":"string","length":"16"},
        "txndate":{"type":"string"},
        "txnGMTdate":{"type":"string"},
        "txntypeid":{"type":"integer"},
        "currency":{"$ref":"/currency"},
        "sender":{"$ref":"/sender"},
        "receiver":{"$ref":"/receiver"},
        "charges":{"$ref":"/charges"},
        "othertxnInfo":{"$ref":"/othertxnInfo"}

    },
    "required":['txnno','txntypeid','currency',"sender","receiver","charges","othertxnInfo"]

};


module.exports=laasSchema;

