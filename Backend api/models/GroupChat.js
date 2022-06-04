const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupChatSchema = new Schema({
    grpId:{type:String, required:true},
    messages:{type:Object, required:true, default:null}
})


const GroupChat = mongoose.model("GroupChat", groupChatSchema);

module.exports = GroupChat;