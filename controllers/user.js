const User = require('../models/user');
const jwt = require('jsonwebtoken');// to generate signed token
const expressJwt = require('express-jwt')//for authorization check
const {errorHandler} = require('../helpers/dbErrorHandler')


exports.signup = async(req,res)=>{
    //console.log("req.body",req.body);

    const user = new User(req.body);

    try{

        const savedUser = await user.save();

        savedUser.salt = undefined;
        savedUser.hashed_password = undefined;
        
        res.status(201).json({message:"User created succesfully",user:savedUser});
    }catch(err){
        //console.error("Error saving user:",err);
        res.status(400).json({err: errorHandler(err)});
    }
};

/* findOne method no longer accepts a callback

exports.signin = (req,res)=>{
    //find the user based on email
    const {email,password} = req.body;
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                err: 'User with that email does not exist. Please sign up'
            });
        }
        //if user is found make sure the email and password match
        //create authenticate method in user model
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: 'Email and password dont match'
            })
        }
        //generate a signed token with user id and secret
        const token = jwt.sign({__id: user._id},process.env.JWT_SECRET)
        //persist the token  as 't' in cookie with expiry date
        res.cookie('t',token,{expire: new Date() + 9999})
        //return response with user and token frontend client
        const {_id, name, email, role} = user
        return res.json({token,user: {_id,email,name, role}})
    });
};
**hence check the method below
*/

exports.signin = async(req, res)=>{
    const {email,password} = req.body;

    try{

        //Log request data
        console.log("Signin request received:",req.body);


        //check for missing email or password
        if(!email || !password){
            return res.status(400).json({
                error: "Email and password are required."
            });
        }

        //find user by email
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                error: 'User with that email does not exist. Please sign up'
            });
        }
        //authenticate user
        if (!user.authenticate(password)){
            return res.status(401).json({
                error: 'Email and password do not match!'
            });
        }

        //generate JWT token
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        if(!token){
            throw new Error('Token generation failed');
        }

        //Set cookie
        res.cookie('t',token,{expire:new Date() + 9999});

        //REturn user and token
        const {_id,name,email:userEmail,role} = user;
        return res.json({token,user:{_id,email:userEmail,name,role}});
    }
    catch(err){
        //Log the error details
        console.error("Error during user authentication: ",err);
        return res.status(500).json({
            error: 'Internal server error during user authentication.'
        });
    }
};

exports.signout = (req,res)=>{
    res.clearCookie('t');
    res.json({message: "Signout success"});
};
