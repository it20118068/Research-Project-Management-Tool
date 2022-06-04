const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8085;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

//Connect DB
mongoose.connect(URL);





const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("Mongodb Connection Success!");
});

 

//Routes
const userRouter = require("./routes/users.js");
app.use("/user", userRouter);


const uploadFileRouter = require("./routes/uploadFiles.js");
app.use("/file",uploadFileRouter);
app.use('/uploads', express.static('uploads'));


const activityRouter = require("./routes/activities.js");
app.use("/activity",activityRouter);

const studentGroupRouter = require("./routes/studentGroups.js");
app.use("/student-groups",studentGroupRouter);

const requestRouter = require("./routes/requests.js");
app.use("/request",requestRouter);

const groupChatRouter = require("./routes/groupChats.js");
app.use("/groupChat",groupChatRouter);



app.listen(process.env.PORT || PORT, ()=>{
    console.log('Server is up and running on port ' + PORT);  
}); 