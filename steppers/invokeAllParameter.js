var laasRepository=require("../db/laasRepository");

exports.invokeAllParameter=function(req,res,next){


    console.log("in steppers ---> invoke All Parameters");
    var spParameters=res.locals.parameters;

    var laasData=req.body;


    var response=laasRepository.invokeAllParameter(spParameters,laasData);
    res.send(response);



};