var receiver={
    "id":"/receiver",
    "type":"object",
    "properties":{
        "receiverid":{"type":"integer"},
        "receiverdescription":{"type":"string","length":"100"},
        "agentcodeto":{"type":"char","length":"12"},
        "cashiercodeto":{"type":"char","length":"16"}
    }
};

module.exports=receiver;