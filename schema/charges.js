const floatType="numeric(15,3)";
var charges={
    "id":"/charges",
    "type":"object",
    "properties":{
        "txnamount.lc":{"type":floatType},
        "othercharge.lc":{"type":floatType},
        "margin.lc":{"type":floatType},
        "commission.lc":{"type":floatType},
        "tax.lc":{"type":floatType},
        "cardcharge.lc":{"type":floatType},
        "additionalcharge.lc":{"type":floatType},
        "roundoff.lc":{"type":floatType},
        "txnamount.fc":{"type":floatType},
        "othercharge.fc":{"type":floatType},
        "margin.fc":{"type":floatType},
        "commission.fc":{"type":floatType},
        "tax.fc":{"type":floatType},
        "cardcharge.fc":{"type":floatType},
        "additionalcharge.fc":{"type":floatType},
        "roundoff.fc":{"type":floatType},
        "txnamount.usd":{"type":floatType},
        "othercharge.usd":{"type":floatType},
        "margin.usd":{"type":floatType},
        "commission.usd":{"type":floatType},
        "tax.usd":{"type":floatType},
        "cardcharge.usd":{"type":floatType},
        "additionalcharge.usd":{"type":floatType},
        "roundoff.usd":{"type":floatType},
        "cstotalamt":{"type":floatType},
        "cctotalamt":{"type":floatType},
        "dctotalamt":{"type":floatType},
        "actotalamt":{"type":floatType},
        "optotalamt":{"type":floatType},
        "kntotalamt":{"type":floatType},
        "dftotalamt":{"type":floatType},
        "wltotalamt":{"type":floatType}

    },
    "required":["txnamount.lc"]
};

module.exports=charges;