const axios = require('axios');
const Q = require('Q');

var http = {};

http.post = doPost;

function doPost(hostName, path, requestBody) {
    const defer = Q.defer();
    axios
        .post(hostName + path, JSON.stringify(requestBody))
        .then(function (response) {
            defer.resolve(response.data);
        })
        .catch(function (error) {
            defer.reject(error);
        });
    return defer.promise;
}

module.exports = http;