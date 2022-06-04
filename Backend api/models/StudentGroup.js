const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentGroupSchema = new Schema({
    grpId:{type:String, required: true},
    leader:{type:Object, required: true},
    member_1:{type:Object, default:null},
    member_2:{type:Object, default:null},
    member_3:{type:Object, default:null},
    researchTopic:{type:String, default:null},
    supervisor:{type:String, default:null},
    co_supervisor:{type:String, default:null},
    panelMembers:{type:Object, default:null}
});

const StudentGroup = mongoose.model("StudentGroup", studentGroupSchema);

module.exports = StudentGroup;