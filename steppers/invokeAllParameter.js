var laasRepository=require("../db/laasRepository");

exports.invokeAllParameter=function(req,res,next){


    if(res.locals.executeInstrumentParam===false){
        console.log("in steppers ---> invoke All Parameters");
        const SPName=res.locals.SPName;
        const SPParameters=res.locals.SPParameters;
        laasRepository.invokeAllParameter(SPName,SPParameters)
            .then((result)=>{
                res.send("success");
            })
            .catch((err)=>{

            });
    }
    next();




};