const floatType="numeric(15,8)";
var convrates={
    "id":"/convrates",
    "type":"object",
    "properties":{
        "lc2fc":{"type":floatType},
        "usd2lc":{"type":floatType},
        "usd2fc":{"type":floatType}
    }
};

module.exports=convrates;