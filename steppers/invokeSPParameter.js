var laasRepository=require("../db/laasRepository");

exports.invokeSPParameter=function(req,res,next){
  var spParameters=res.locals.parameters;

  var response=laasRepository.invokeSPParamter(spParameters);
  res.send(response);



};