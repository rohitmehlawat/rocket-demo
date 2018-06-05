var currency={
    "id":"/currency",
    "type":"object",
    "properties":{
        "lc":{"type":"string","length":"3"},
        "fc":{"type":"string","length":"3"}
    },
    "required":['lc','fc']
};

module.exports=currency;