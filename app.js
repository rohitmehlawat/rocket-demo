var express=require('express');
var bodyParser=require('body-parser');
var logger=require('./utils/logger');
var helmet=require('./utils/helmet');
var path=require('path');
//var laasRoutes=require("./routes/laasroutes");

var laasController=require("./controllers/laasController");
const portNo=3000;
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
helmet.bind(app);
logger.bind(app,'error','log','access.log','1d',true);
var server=app.listen(portNo,function(){
   console.log("server is running at 3000");
});

laasController.post('/txnpush', app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



