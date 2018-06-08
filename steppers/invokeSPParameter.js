var laasRepository=require("../db/laasRepository");

exports.invokeSPParameter=function(req,res,next){
    if(res.locals.executeInstrumentParam) {
        const SPName=res.locals.SPName;
        const SPParameters=res.locals.SPParameters;
        const instrumentType=res.locals.instrumentParam;
        const productCode=res.locals.productCode;
        const paymentMode=res.locals.paymentMode;

        laasRepository.invokeSPParamter(SPName,SPParameters,instrumentType,productCode,paymentMode)
            .then((result)=>{

            })
            .catch((err)=>{

            });

    }
    next();




};