const convict = require('convict');
const fs = require('fs');
const yaml = require('js-yaml');


// Defining a schema
var config = convict({
    env: {
        doc: "The application environment.",
        format: ["prod", "dev", "test", "sit"],
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
    },
    notifier: {
        logFile: {
            doc: "Forever Log File Path, mention absolute path.",
            format: String,
            default: "",
            env: "FE_LOG_FILE",
            arg: "feLogFile"

        },
        timeStampFile: {
            doc: "Timestamp Log File Path, mention absolute path.",
            format: String,
            default: "",
            env: "TS_LOG_FILE",
            arg: "tsLogFile"
        },
        emailSubject: {
            doc: "Subject for notifier mail..",
            format: String,
            default: "",
            env: "NOTIFIER_SUB",
            arg: "notifierSub"
        },
        emailBody: {
            doc: "Email body for notifier.(HTML)",
            format: String,
            default: "",
            env: "NOTIFIER_BODY",
            arg: "notifierBody"
        },
        toEmails: {
            doc: "Mention reciever emails with comma seprated .",
            format: String,
            default: "",
            env: "NOTIFIER_TO_EMAILS",
            arg: "notifierToEmails"
        }
    },
    mail: {
        service: {
            doc: "Mention the service for mail.",
            format: String,
            default: "",
            env: "EMAIL_SERVICE",
            arg: "emailService"
        },
        host: {
            doc: "Mention the host for service of mail.",
            format: String,
            default: "",
            env: "EMAIL_SERVICE_HOST",
            arg: "emailServiceHost"
        },
        port: {
            doc: "The host port to bind.",
            format: "port",
            default: 465,
            env: "EMAIL_SERVICE_PORT",
            arg: "emailServicePort"
        },
        username: {
            doc: "username for mailing service.",
            format: String,
            default: "",
            env: "EMAIL_USERNAME",
            arg: "eUsername"
        },
        password: {
            doc: "password for mailing service.",
            format: String,
            default: "",
            env: "EMAIL_PWD",
            arg: "ePWD"
        },
        fromEmail: {
            doc: "Mention sender email .",
            format: String,
            default: "",
            env: "FROM_EMAIL",
            arg: "fromEmail"
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