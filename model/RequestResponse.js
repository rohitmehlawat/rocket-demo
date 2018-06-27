function RequestResponseData(){

};
RequestResponseData.prototype.data={};
RequestResponseData.prototype.getData=(name)=>{
    return RequestResponseData.prototype.data[name];
};

RequestResponseData.prototype.setData=(name,value)=>{
    RequestResponseData.prototype.data[name]=value;
};

module.exports=RequestResponseData;

