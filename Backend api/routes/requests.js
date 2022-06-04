const router = require("express").Router();

let Request = require("../models/Request");
let StudentGroup = require("../models/StudentGroup");

//Add Request
router.route("/create").post(async (req, res)=>{

    const {type, grpId,senderId,receiverId, content, status} = req.body;
    
    const newRequest = new Request({type, grpId,senderId,receiverId, content, status});

    await newRequest.save().then(()=>{
        res.json("Requested");
    }).catch((err)=>{
        res.json("Failed");
        console.log(err);
    })
});

//Get sent requests by ID
router.route("/sent/:id").get(async (req, res)=>{
    let senderId = req.params.id;


    await Request.find({senderId}).then((requests)=>{
        return res.json({ requests })
    }).catch((err)=>{
        console.log(err)
		res.json({ status: 'error', error:err })
    })
})

//Get receive requests by ID
router.route("/receive/:id").get(async (req, res)=>{
    let receiverId = req.params.id;


    await Request.find({receiverId}).then((requests)=>{
        return res.json({ requests })
    }).catch((err)=>{
        console.log(err)
		res.json({ status: 'error', error:err })
    })
})

router.route("/update/:id").put(async (req, res)=>{
    let id = req.params.id;
    const {status} = req.body;

    console.log(status)

    await Request.findByIdAndUpdate(id, {status}).then(()=>{
        res.status(200).send({status: "request updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    });
    
})



module.exports = router;