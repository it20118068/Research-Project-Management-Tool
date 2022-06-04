const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken")
const jwt = require('jsonwebtoken');



let User = require("../models/User");

//Insert User data
router.route("/addUser").post(asyncHandler(async (req, res)=>{
    const {id, name, email, password, role, faculty, researchArea } = req.body;

    const newUser = new User({id, name, email, password, role, faculty, researchArea});

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    // await newUser.save().then(()=>{
    //     res.json("Student added");
    // }).catch((err)=>{
    //     console.log(err);
    // });

    const user = await User.create(newUser);
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            pic: user.pic,
            token:generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error("Failed to add the user");
    }

}));



//Login
 router.route("/login").post(asyncHandler(async (req, res) =>{
     const { email, password } = req.body;
     const user = await User.findOne({ email });

     if(user && (password == user.password)){
        const token = jwt.sign(
			{
				name: user.name,
				_id: user._id,
                email: user.email,
                role: user.role
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token, sid:user.id})
     }else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    } 

 }));


//Get users
router.route("/").get(async (req, res)=>{
    await User.find().then((users)=>{
        res.json(users);
    }).catch((err)=>{
        console.log(err);
    })
});


//Update user by admin
router.route("/updateUser/:id").put(async (req, res)=>{
    let uid = req.params.id;
    const {id, name, email, password, role, subRole, faculty, researchArea } = req.body;

    const updateUser = {id, name, email, password, role, subRole, faculty, researchArea} 

    

    await User.findByIdAndUpdate(uid, updateUser).then(()=>{
        res.status(200).send({status: "User updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    });
});


//Delete user
router.route("/deleteUser/:id").delete(async (req, res)=>{
    let uid = req.params.id;

    await User.findByIdAndDelete(uid).then(()=>{
        res.status(200).send({status: "User Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message });
    })
})


router.route("/auth").post(async (req, res)=>{
    const token = req.headers['x-access-token']

    try {
		const decoded = jwt.verify(token, 'secret123')
		const _id = decoded._id
		const user = await User.findById(_id);

		return res.json({ status: 'ok', name: user.name, role: user.role, id: user._id, subRole: user.subRole, uid:user.id, user:user })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})


//find Supervisors
router.route("/supervisors").get(async (req, res)=>{
    const u = {
        subRole:0
    }
    await User.find(u).then((users)=>{
        res.json(users);
    }).catch((err)=>{
        console.log(err);
    })
});

//find Co-Supervisors
router.route("/co-supervisors").get(async (req, res)=>{
    const u = {
        subRole:1
    }
    await User.find(u).then((users)=>{
        res.json(users);
    }).catch((err)=>{
        console.log(err);
    })
});

//find Panel Members
router.route("/panel").get(async (req, res)=>{
    const u = {
        subRole:2
    }
    await User.find(u).then((users)=>{
        res.json(users);
    }).catch((err)=>{
        console.log(err);
    })
});


module.exports = router;

// newStudent.save().then(()=>{
//     res.json("Student added");
// }).catch((err)=>{
//     console.log(err);
// });