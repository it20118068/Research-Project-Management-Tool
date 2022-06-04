const router = require("express").Router();

let GroupChat = require("../models/GroupChat");

router.route("/create/:id").post(async (req,res)=>{
    const grpId = req.params.id;
    const newGroupChat = new GroupChat({grpId});

    await newGroupChat.save().then(()=>{
        res.json({isSuccsess:true});
    }).catch((err)=>{
        res.json({isSuccsess:false});
        console.log(err);
    })
})


router.route("/send").put(async (req, res)=>{
    const {grpId , message} = req.body;

    let exisitingChat = null;

    await GroupChat.findOne({grpId:grpId}).then((chat)=>{
        exisitingChat  = chat;
    }).catch((err)=>{
        console.log(err);
    })

    if(exisitingChat != null){

        let messages = exisitingChat.messages;
        messages.push(message);

        const updateChat = {messages:messages}


        await GroupChat.findByIdAndUpdate(exisitingChat._id, updateChat).then(()=>{
            res.status(200).send({status: "Message sent"});
        }).catch((err)=>{
            console.log(err);
            res.status(500).send({status: "Failed to send the message", error: err.message});
        });

    } else{
        let messages = [];
        messages.push(message);

        const newChat = new GroupChat({grpId, messages});
    
        await newChat.save().then(()=>{
            res.status(200).send({status: "Message sent"});
        }).catch((err)=>{
            console.log(err); 
        })
    }
   
});



//Get chat by grpId
router.route("/get/:id").get(async (req, res)=>{
    let grpId = req.params.id;


    await GroupChat.findOne({grpId: grpId}).then((chat)=>{
        return res.json(chat)
    }).catch((err)=>{
        console.log(err)
		res.json({ status: 'error', error:err })
    })
})



module.exports = router;