const router = require("express").Router();
const multer = require('multer');
const path = require('path');

let Activity = require("../models/Activity");



// const DIR = './public/';
const DIR = 'uploads/byAdmin/';

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
        cb(null, true);
    }
});





// //Create Activity
// router.route("/createActivity").post(async (req, res)=>{

//     const {title, activityType} = req.body;

//     const newActivity = new Activity({title, activityType});

    

//     await newActivity.save().then(()=>{
//         res.json("Activity Added");
//     }).catch((err)=>{
//         console.log(err);
//     })
// });



//Create Activity
router.route("/createActivity").post(upload.single('fileData'), async (req, res)=>{
    const url = req.protocol + '://' + req.get('host');
    // const {title, activityType} = req.body;

    if(req.body.activityType == 2){
        const newActivity = new Activity({
            title: req.body.title, 
            activityType: req.body.activityType,
            fileData: url + '/uploads/byAdmin/' + req.file.filename
        });

        await newActivity.save().then(()=>{
            res.json("Activity Added");
        }).catch((err)=>{
            console.log(err);
        })
    } else {
        const newActivity = new Activity({
            title: req.body.title, 
            activityType: req.body.activityType,
        });

        await newActivity.save().then(()=>{
            res.json("Activity Added");
        }).catch((err)=>{
            console.log(err);
        })
    }
    

    

    
});



//Get Activities
router.route("/").get(async (req, res)=>{
    await Activity.find().then((activities)=>{
        res.json(activities);
    }).catch((err)=>{
        console.log(err);
    })
})

//Delete Activity By Id
router.route("/delete/:id").delete(async (req, res)=>{
    let id = req.params.id;

    await Activity.findByIdAndDelete(id).then(()=>{
        res.status(200).send({status: "Activity Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete activity", error: err.message });
    })
})


module.exports = router;