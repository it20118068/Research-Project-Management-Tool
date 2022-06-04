const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    title:{type:String, required:true},
    activityType:{type:Number, required:true},
    fileData:{type:String}
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;