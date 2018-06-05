/*var Sybase=require("sybase");
const logTiming=true;
const jarPath = "JavaSybaseLink.jar";
var db=new Sybase('192.168.1.178',32768,'testdb','tester','guest1234',logTiming);*/

// ----db connection

exports.connect=function(procedureName){
    /*db.connect(function(err){
        if(err){
            var errResponse=JSON.stringify(err);
            return errResponse;
        }
        else{
            console.log("connected");
        }
        db.query(procedureName,function(err,data){
            if(err) return JSON.stringify(err);
            db.disconnect();
            return  JSON.stringify(data);
        });
    });*/
    return true;
};

