const NodeRSA = require('node-rsa');
const config = require('../config/conf');
const yaml = require('js-yaml');
const fs = require('fs');
const logger = require('../utils/logger');

var key = {}
key.decrypt = decrypt;
key.encrypt = encrypt;

function decrypt(encryptedString, ssid) {
    var rsaKey = new NodeRSA(loadKey(ssid));
    return rsaKey.decrypt(encryptedString, 'utf8');
}

function encrypt(decryptedString, ssid) {
    var rsaKey = new NodeRSA(loadKey(ssid));
    return rsaKey.encrypt(decryptedString, 'base64');
}

function loadKey(ssid){
    logger.log('info', 'trying to load RSA private key for client with api_source_key = ' + ssid);
    var doc = yaml.safeLoad(fs.readFileSync(__dirname + '/../config/rsaKeys.yml', 'utf8'));
    var keys = doc['keys'];
    for(var index = 0 ; index < keys.length; index ++){
        var key = keys[index]['key'];
        if(key['ssid'] === ssid){
            logger.log('info', 'RSA private key for client with api_source_key = ' + ssid + ' found. Returing it.');
            return key['privateKey'];
        }
    }
    logger.log('error', 'trying to load RSA private key for client with api_source_key = ' + ssid + ' but not found.');
}

module.exports = key;