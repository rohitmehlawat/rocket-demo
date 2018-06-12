function RequestResponseData(){};

RequestResponseData.prototype.getData=(name)=>{
    return RequestResponseData.prototype[name];
};

RequestResponseData.prototype.setData=(name,value)=>{
    RequestResponseData.prototype[name]=value;
};

module.exports=RequestResponseData;

