
var util = {};
util.ResponseCodeEnum = ResponseCodeEnum;
util.getDescriptionForResCode = getDescriptionForResCode;

const ResponseCodeEnum = Object.freeze({
    "S00001": "Transaction posted successfully to Finance System for Ledger Posting",
    "E00001": "Request does not contain value for a field that is mandatory",
    "E00002": "Request does not contain value for a field that is mandatory",
    "E00003": "Value specified for a field is not recognized",
    "E00004": "Value specified for a field does not comply with a particular format",
    "E00005": "Length of value of a field less than minimum or more than allowed length" 
});

 function getDescriptionForResCode(responseCode){
    return ResponseCodeEnum[responseCode];
 }

module.exports = util;

