let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    router = express.Router();

const path = require('path');


const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)


// const DIR = './public/';
const DIR = 'uploads/';

//Set Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext)
    }
});


var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "application/pdf") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

const UploadFile = require('../models/UploadFile');

let User = require('../models/UploadFile');
router.post('/uploadFile', upload.single('fileData'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')

    const uploadFile = new UploadFile({
        title: req.body.title,
        grpId: req.body.grpId,
        fileData: url + '/uploads/' + req.file.filename,
        senderId: req.body.senderId,
    });
    uploadFile.save().then(result => {
        res.status(201).json({
            message: "File Submitted"
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})



//Get Submitted Docs by userID
router.get("/:id", (req, res, next) => {

    let senderId = req.params.id;

    UploadFile.find({senderId}).then((SubmittedFiles) => {
        res.status(200).json({
            SubmittedFiles
        });
    }).catch((err)=>{
        res.json({ status: 'error', error:err })
        console.log(err);
    });
});

//Get Submitted Docs by Grp ID
router.get("/group/:id", (req, res, next) => {

    let grpId = req.params.id;

    UploadFile.find({grpId}).then((SubmittedFiles) => {
        res.status(200).json({
            SubmittedFiles
        });
    }).catch((err)=>{
        res.json({ status: 'error', error:err })
        console.log(err);
    });
});


router.route("/update/:id").put(async (req, res)=>{
    const id = req.params.id;

    const {feedback, evaluatedBy} = req.body;
    const updateSub = {feedback, evaluatedBy}

    await UploadFile.findByIdAndUpdate(id, updateSub).then(()=>{
        res.status(200).send({status: "Updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    });
    
})








router.get("/", (req, res, next) => {
    User.find().then(data => {
        res.status(200).json({
            message: "User list retrieved successfully!",
            users: data
        });
    });
});

//http://localhost:8085/file/delete/1650195396366.pdf
router.delete("/delete/:id", async(req, res)=>{
    await unlinkAsync('uploads/'+req.params.id).then(()=>{
        res.send({status: "file deleted"});
    }).catch((err)=>{
        res.status(500).send({status: "Error with deleting data", error: err.message});
    })
})

module.exports = router;