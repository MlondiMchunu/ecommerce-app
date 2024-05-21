const User = require('../models/user')
const {errorHandler} = require('../helpers/dbErrorHandler')


exports.signup = async(req,res)=>{
    //console.log("req.body",req.body);

    const user = new User(req.body);

    try{
        //user.salt = undefined;
        //user.hashed_password = undefined;

        const savedUser = await user.save();

        savedUser.salt = undefined;
        savedUser.hashed_password = undefined;
        
        res.status(201).json({message:"User created succesfully",user:savedUser});
    }catch(err){
        //console.error("Error saving user:",err);
        res.status(400).json({err: errorHandler(err)});
    }
};