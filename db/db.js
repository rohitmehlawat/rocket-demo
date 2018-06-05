var Sybase = require("sybase");
const logTiming = true;
const jarPath = "JavaSybaseLink.jar";
var db = new Sybase('192.168.1.178', 32768, 'testdb', 'tester', 'guest1234', logTiming);

// ----db connection

exports.connect = function (procedureName, callback) {
    db.connect(function (err) {
        if (err) {
            var errResponse = JSON.stringify(err);
            return errResponse;
        }
        else {
            console.log("connected");
        }
        db.query(procedureName, function (err, data) {
            db.disconnect();
            if (err) 
                JSON.stringify(err);
            callback(JSON.stringify(data));
        });
    });
};

