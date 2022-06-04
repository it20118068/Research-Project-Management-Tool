const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Request Types
// 0 - Topic Requests
// 1 - Supervisor Requests
// 2 - Co-Supervisor Requests
 
const requestsSchema = new Schema({
    type:{type:Number, required: true},
    grpId:{type:String, required: true},
    senderId:{type:String, required:true},
    receiverId:{type:String, required:true},
    content:{type:String, default:null},
    status:{type:String, default:"Pending"},
});

const Request = mongoose.model("Request", requestsSchema);

module.exports = Request; 