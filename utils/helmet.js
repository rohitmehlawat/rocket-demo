const helmet = require('helmet')

exports.bind = function(app) {
    app.use(
        helmet.hsts({
            maxAge: 7776000000,
            includeSubdomains: true
        })
    );
    app.use(helmet.hidePoweredBy({ setTo: 'all your base are belong to us' }))
    app.use(helmet.xssFilter());
    app.use(helmet.noCache());
    app.use(helmet.noSniff());
    app.use(helmet.frameguard());
};
