const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffSchema = new Schema({
    eid: {type:String, required:true},
    name: {type:String, required:true},
    email: {type:String, required:true, unique: true},
    password: {type:String, required:true},
    role: {type:Number, required:true},
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

 