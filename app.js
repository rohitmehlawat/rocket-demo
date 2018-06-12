const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const helmet = require('./utils/helmet');
const path = require('path');
const config = require('./config/conf');
const laasController = require('./controllers/laasController');
const interceptor = require('./utils/responseInterceptor');

const portNo = config.get('app.port');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

   
  // Add the interceptor middleware
app.use(interceptor);
   
helmet.bind(app);

logger.bind(
    app, config.get('logger.level'),
    config.get('logger.directory'),
    config.get('logger.file'),
    config.get('logger.rollingStrategy'),
    config.get('logger.isPretty'));

var server = app.listen(portNo, function () {
    console.log("server is running at " + portNo);
});

laasController.post('/txnpush', app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



