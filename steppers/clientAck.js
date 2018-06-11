const http = require('../utils/http');

var clientAck = {};
clientAck.ack = ack;

function ack(req, res) {
    var request = {
        "txnno": "12345",
        "paymentstatus": 1,
        "reason": "Accepted"
    }

    http.post('http://demo7999608.mockable.io', '/clientAck', request)
        .then((result) => {
            console.log("Result   ---- " + JSON.stringify(result));
            res.status(200);
            res.send(JSON.stringify(result));
        })
        .catch((error) => {
            console.log("Error   ---- " + error)
            res.status(500);
            res.send({
                response: err.message
            });
        });
}

module.exports = ack;