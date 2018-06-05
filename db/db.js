const SyBase = require('node-sybase')

db = new SyBase([
    {
        name: 'main',
        host: 'localhost',
        port: 32768,
        dbname: 'testdb?charset=cp936',
        username: 'tester',
        password: 'guest1234'
    }
])

// ----db connection

exports.connect = function (query, callback) {
    db.DBPools.main.execute(
        query
    ).then(
        res => {
            callback(res);
        }
    ).catch(
        err => {
            callback(err);
        }
    );
};

