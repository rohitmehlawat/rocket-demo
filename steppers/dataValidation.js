var laasRepository=require("../db/laasRepository");
exports.validateData=function(req,res,next){

    console.log("in steppers --> validateData method");

    var laasData=req.body;
    var isDataValid=laasRepository.validateData(laasData)
        .then((result)=>{
            if(result[0].returnCode=='True'){
                next();
            }
            else{
                res.send("invalidData");
            }
        })
        .catch((err)=>{

        });


};