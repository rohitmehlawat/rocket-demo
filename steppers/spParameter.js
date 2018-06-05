var laasRepository=require("../db/laasRepository");



exports.setSPParameter=function(req,res,next){

    const parameters=res.locals.parameters;


    next();
};