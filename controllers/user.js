const User = require('../models/user');


exports.userById = async (req,res,next,id)=>{
   //Query.prototype.exec() no longer
   //accepts a callback
    /*User.findById(id).exec((err,user)=>{
       if(err || !user){
        return res.status(400).json({
            error: 'User not found'
        })
       }
       req.profile = user
       next();
    });*/

    try{
        const user = await User.findById(id).exec();
        if(!user){
            return res.status(400).json({
                error1: 'User not found'
            });
        }
        req.profile = user;
        next();
        
    } catch(err){
        console.log('Error finding by ID:', err);
        return res.status(400).json({
            error2: 'User not found'
        });
    }

};