function response(){};

response.prototype.getData=(key)=>{
    return response.prototype[key];
};

response.prototype.setData=(key,value)=>{
    response.prototype[key]=value;
};

module.exports=response;