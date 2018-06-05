var appRouter=function(app){

    var laasController=require("../controllers/laasController");

    app.use("/txnpush",laasController.post);

};
module.exports=appRouter;