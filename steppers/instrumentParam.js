var laasRepository=require("../db/laasRepository");

exports.getInstrumentType=function(req,res,next){

    if(res.locals.executeInstrumentParam) {

        console.log("in steppers ---> getting instrument type");

        const txnTypeId = req.body.txntypeid;

        laasRepository.getInstrumentType(txnTypeId)
            .then((result)=>{
                res.locals.instrumentParam = instrumentParam;
            })
            .catch((err)=>{

            });


    }
    next();
};