const NodeRSA = require('node-rsa');
const config = require('../config/conf');

const rsaKeyString = config.get('security.rsaKey');
const rsaKey = new NodeRSA(rsaKeyString);

var key = {}
key.decrypt = decrypt;
key.encrypt = encrypt;

function decrypt(encryptedString) {
    return rsaKey.decrypt(encryptedString, 'utf8');
}

function encrypt(decryptedString) {
    return rsaKey.encrypt(decryptedString, 'base64');
}

module.exports = key;