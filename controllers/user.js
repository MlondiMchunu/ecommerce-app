const User = require('../models/user')

/*exports.signup = (req, res)=>{
    console.log("req.body",req.body);
    const user = new User(req.body);

   user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err
            })
        }
        res.json({
            user
        });

    })
};*/

exports.signup = async(req,res)=>{
    console.log("req.body",req.body);

    const user = new User(req.body);

    try{
        const savedUser = await user.save();
        res.status(201).json({message:"User created succesfully",user:savedUser});
    }catch(err){
        console.error("Error saving user:",err);
        res.status(500).json({error:"Error saving user"});
    }
};