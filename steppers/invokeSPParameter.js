var laasRepository=require("../db/laasRepository");

exports.invokeSPParameter=function(req,res,next){
    if(res.locals.executeInstrumentParam) {
        var spParameters = res.locals.parameters;
        var instrumentParam=res.locals.instrumentParam;
        var paymentMode=res.locals.paymentMode;

        laasRepository.invokeSPParamter(spParameters,instrumentParam,paymentMode)
            .then((result)=>{

            })
            .catch((err)=>{

            });

    }
    next();




};