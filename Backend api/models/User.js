const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {type:String, required:true},
    name: {type:String, required:true},
    email: {type:String, required:true, unique: true},
    password: {type:String, required:true},
    role: {type:Number, required:true},
    subRole: {type:Number, default:null},
    faculty: {type:String, required:true},
    researchArea: {type:String, required:true},
    pic: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

 