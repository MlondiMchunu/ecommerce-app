const Category = require('../models/category');
const { errorHandler } = require('../helpers/dbErrorHandler');

/*
exports.create = (req,res)=>{
    const category = new Category(req.body);
    category.save((err,data)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({data})
    })
}
    */

exports.create = async(req, res) => {
    const category = new Category(req.body);
    try {
        const data = await category.save();
        res.status(201).json({data});

    } catch (err) {
        res.status(400).json({error:errorHandler(err)});

    }
};