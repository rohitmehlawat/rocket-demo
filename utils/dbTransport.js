const Transport = require('winston-transport');
const util = require('util');
//
// Inherit from `winston-transport` so we can take advantage
// of the base functionality and `.exceptions.handle()`.
//
class DBTransport extends Transport {
    constructor(opts) {
      super(opts);
    }

    log(level, msg, meta, callback) {
        setImmediate(() => {
            this.emit('logged', msg);
         });
        var requestTime;
        var responseTime;
        var hostIp = meta.req.headers.host;
        var ssid;
        var txnTypeId = meta.req.body.txntypeid;
        var txnNumber = meta.req.body.txnno;
        var responseCode = meta.res.statusCode;
        var responseStatus = meta.res.body.statusResponse;

        // console.log({ level: level, msg: msg, meta: meta});
        // console.log("------2------"+JSON.stringify(meta.req.headers));
        // console.log("------3------"+JSON.stringify(meta.res.body));
        // console.log("------4------"+JSON.stringify(meta.req.body));
    }
  };
 //Creating instance of custom logger

 var dbTransport = new DBTransport();
 dbTransport.on('logged', function(info){
 });

 module.exports = dbTransport;