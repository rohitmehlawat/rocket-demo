const SyBase = require('node-sybase');
const Q = require('q');

var sybase = new SyBase([
    {
        name: 'main',
        host: '192.168.1.178',
        port: 32768,
        dbname: 'testdb?charset=cp936',
        username: 'tester',
        password: 'guest1234'
    }
])

// ----db connection

exports.connect = function (query) {
    var defer = Q.defer();
    console.log("in database");
    sybase.DBPools.main.execute(
        query
    ).then(
        res => {
            console.log("in resolve");
            defer.resolve(res);
        }
    )
        .catch(
        err => {
            console.log("in error--->"+err);
            defer.reject(err);
        }
    );
    return defer.promise;
};

