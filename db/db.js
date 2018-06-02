/*var Sybase=require("sybase");
const logTiming=true;
const jarPath="../node_modules/sybase/JavaSybaseLink/dist/JavaSybaseLink.jar";
var db=new Sybase('10.1.47.71',5000,'bo','sa',logTiming,jarPath);*/

// ----db connection

exports.connect=function(procedureName){
    /*db.connect(function(err){
        if(err) return console.log(err);
        db.query(procedureName,function(err,data){
            if(err) return console.log(err);
            db.disconnect();
            return  JSON.stringify(data);
        });
    });*/
    return true;
};

