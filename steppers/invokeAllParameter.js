var laasRepository=require("../db/laasRepository");

exports.invokeAllParameter=function(req,res,next){


    console.log("in steppers ---> invoke All Parameters");
    var spParameters=res.locals.parameters;

    var laasData=req.body;


    laasRepository.invokeAllParameter(spParameters,laasData)
        .then((result)=>{
            res.send("success");
        })
        .catch((err)=>{

        });



};