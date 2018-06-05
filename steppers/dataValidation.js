var laasRepository=require("../db/laasRepository");
exports.validateData=function(req,res,next){

    console.log("in steppers --> validateData method");

    var laasData=req.body;
    var isDataValid=laasRepository.validateData(laasData);
    if(isDataValid===true){
        next();
    }
    else{
        res.send("invalidData");
    }

};