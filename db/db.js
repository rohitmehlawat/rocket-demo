const SyBase = require('node-sybase');
const Q = require('q');
const config = require('../config/conf')

var sybase = new SyBase([
    {
        name: 'main',
        host: config.get('db.host'),
        port: config.get('db.port'),
        dbname: config.get('db.name'),
        username: config.get('db.username'),
        password: config.get('db.password')
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

