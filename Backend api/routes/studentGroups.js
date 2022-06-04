const router = require("express").Router();

let StudentGroup = require("../models/StudentGroup");

//Create Student Group
router.route("/register").post(async (req, res)=>{
    const {leader, member_1,member_2,member_3} = req.body;
    let grpId = "RES" + Math.floor(Math.random() * 1000).toString();
    const newStudentGroup = new StudentGroup({grpId, leader, member_1,member_2,member_3});

    await newStudentGroup.save().then(()=>{
        res.json("Group Added");
    }).catch((err)=>{
        console.log(err);
    })
});


//Get Student Groups
router.route("/").get(async (req, res)=>{

    await StudentGroup.find().then((groups)=>{
        res.json(groups);
    }).catch((err)=>{
        console.log(err);
    })
});

//Add panel members
router.route("/panel/:id").put(async (req, res)=>{
    const id = req.params.id;

    const panelMembers = req.body;
    const updateGroup = {panelMembers}

    await StudentGroup.findByIdAndUpdate(id, updateGroup).then(()=>{
        res.status(200).send({status: "Group updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    });
    
})

router.route("/supervisor/:id").put(async (req, res)=>{
    const id = req.params.id;

    const supervisor = req.body;


    await StudentGroup.findOneAndUpdate({grpId:id}, supervisor).then(()=>{
        res.status(200).send({status: "Group updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    });

   
    
})

router.route("/co-supervisor/:id").put(async (req, res)=>{
    const id = req.params.id;

    const co_supervisor = req.body;


    await StudentGroup.findOneAndUpdate({grpId:id}, co_supervisor).then(()=>{
        res.status(200).send({status: "Group updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    });
    
})

router.route("/topic/:id").put(async (req, res)=>{
    const id = req.params.id;

    const researchTopic = req.body;
    console.log(researchTopic)


    await StudentGroup.findOneAndUpdate({grpId:id}, researchTopic).then(()=>{
        res.status(200).send({status: "Group updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    });
})


//get grps by user id
router.route("/staff/:id").get(async (req, res)=>{
    const id = req.params.id;

    let groups = await StudentGroup.find();
    let groupList = [];


    for(const group of groups){
        
        if(group.panelMembers != null){

            if(id == group.supervisor || id == group.co_supervisor || id == group.panelMembers.member1 || id == group.panelMembers.member2 || id == group.panelMembers.member3){
                groupList.push(group.grpId);
            } 
        }
        
    }
    res.json(groupList); 
})
 

//get student grps by user id
router.route("/student/:id").get(async (req, res)=>{
    const id = req.params.id;

    let groups = await StudentGroup.find();
    let groupId = null;

    for(const group of groups){
        if(id == group.leader.leaderId || id == group.member_1.member1_Id || id == group.member_2.member2_Id || id == group.member_3.member3_Id){
            groupId = group.grpId;
        } 
    }
    res.json(groupId); 
})




//Get Activities
// router.route("/").get(async (req, res)=>{
//     await Activity.find().then((activities)=>{
//         res.json(activities);
//     }).catch((err)=>{
//         console.log(err);
//     })
// })


module.exports = router;