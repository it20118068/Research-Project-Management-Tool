const mongoose = require('mongoose');
// const mongoose = require("../database")

const Schema = mongoose.Schema;

const uploadFileScheme = new Schema({
    title: {type:String, required:true},
    grpId: {type:String, required:true},
    fileData: {type:String, required:true},
    senderId: {type:String, required:true},
    feedback: {type:String, default:null},
    evaluatedBy: {type:String, default:null}
});

const UploadFile = mongoose.model("UploadFile", uploadFileScheme);

module.exports = UploadFile;