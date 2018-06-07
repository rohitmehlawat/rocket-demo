const convict = require('convict');
const fs = require('fs');
const yaml = require('js-yaml');


// Defining a schema
var config = convict({
    env: {
        doc: "The application environment.",
        format: ["prod", "dev", "test"],
        default: "dev",
        env: "NODE_ENV",
        arg: "env"
    },
    app: {
        port: {
            doc: "The port to bind.",
            format: "port",
            default: 3000,
            env: "PORT",
            arg: "port"
        }
    },
    db: {
        host: {
            doc: "Database host name/IP",
            format: String,
            default: 'localhost',
            env: "DB_HOST",
            arg: "db_host"
        },
        port: {
            doc: "Database port",
            format: Number,
            default: 5000,
            env: "DB_PORT",
            arg: "db_port"
        },
        name: {
            doc: "Database name",
            format: String,
            default: 'testdb',
            env: "DB_NAME",
            arg: "db_name"
        },
        username: {
            doc: "Database username",
            format: String,
            default: 'developers',
            env: "DB_USER_NAME",
            arg: "db_username"
        },
        password: {
            doc: "Database password",
            format: String,
            default: 'developers@123',
            env: "DB_PASSWORD",
            arg: "db_password"
        }
    }
});

// Load environment dependent configuration
var env = config.get('env');
var filePath = __dirname + '/' + env + '.yml';
var configFile = yaml.safeLoad(fs.readFileSync(filePath));
config.load(configFile);

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;