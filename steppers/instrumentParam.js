var laasRepository=require("../db/laasRepository");

exports.getInstrumentType=function(req,res,next){

    if(res.locals.executeInstrumentParam) {

        console.log("in steppers ---> getting instrument type");

        const txnTypeId = req.body.txntypeid;


        laasRepository.getInstrumentType(txnTypeId)
            .then((result)=>{
                res.locals.instrumentParam = result[0];
            })
            .catch((err)=>{
                res.status(400);
                res.send({
                    response:err.message
                });
            });


    }
    next();
};