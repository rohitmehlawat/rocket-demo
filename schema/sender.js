var sender={
    "id":"/sender",
    "type":"object",
    "properties":{
        "senderid":{"type":"integer"},
        "senderdescription":{"type":"string","length":"100"},
        "agentcode":{"type":"string","length":"12"},
        "customerno":{"type":"string","length":"16"},
        "casherid":{"type":"string","length":"16"}
    }
};

module.exports=sender;