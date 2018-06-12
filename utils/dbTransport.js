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

        const requestTime="";
        const responseTime="";
        const hostIp = meta.req.headers.host;
        const ssid="";
        const txnTypeId = meta.req.body.txntypeid;
        const txnNumber = meta.req.body.txnno;
        const responseCode = meta.res.statusCode;
        const responseStatus = meta.res.body.statusResponse;

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