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
            arg: "dbHost"
        },
        port: {
            doc: "Database port",
            format: Number,
            default: 5000,
            env: "DB_PORT",
            arg: "dbPort"
        },
        name: {
            doc: "Database name",
            format: String,
            default: 'testdb',
            env: "DB_NAME",
            arg: "dbName"
        },
        username: {
            doc: "Database username",
            format: String,
            default: 'developers',
            env: "DB_USER_NAME",
            arg: "dbUsername"
        },
        password: {
            doc: "Database password",
            format: String,
            default: 'developers@123',
            env: "DB_PASSWORD",
            arg: "dbPassword"
        }
    },
    logger: {
        directory: {
            doc: "Log Directory",
            format: String,
            default: '../log',
            env: "LOG_DIR",
            arg: "logDir"
        },
        file: {
            doc: "Log File Name",
            format: String,
            default: 'app.log',
            env: "LOG_FILE",
            arg: "logFile"
        },
        level: {
            doc: "Logger Error",
            format: String,
            default: 'info',
            env: "LOG_LEVEL",
            arg: "logLevel"
        },
        rollingStrategy: {
            doc: "Rolling Strategy",
            format: String,
            default: '1d',
            env: "ROLLING_STRATEGY",
            arg: "rollingStrategy"
        },
        isPretty: {
            doc: "Need pretty logs",
            format: Boolean,
            default: true,
            env: "IS_PRETTY",
            arg: "isPretty"
        }
    },
    security: {
        rsaKey: {
            doc: "RSA Key",
            format: String,
            default: "",
            env: "RSA_KEY",
            arg: "rsaKey"
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