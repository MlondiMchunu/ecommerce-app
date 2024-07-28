const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs")
const Product = require("../models/product")
const { errorHandler } = require("../helpers/dbErrorHandler")

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error("Form parse error:",err);
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        let product = new Product(fields);

        //log files object to see if the photo property exists and has a path
        console.log("Files: ", files);
        console.log("Fields: ", fields);


       /* if (files.photo) {
            //LOg the entire files.photo object
            console.log("files.photo : ", files.photo);

            if (files.photo.path && files.photo.type) {//validate path and type
                try {
                    product.photo.data = fs.readFileSync(files.photo.path);
                    product.photo.contentType = files.photo.type;
                    product.customPhoto = true;
                } catch (readError) {
                    console.error("Error reading the uploaded file:", readError);
                    return res.status(400).json({
                        error: "Error reading the uploaded file",
                        details: readError.message
                    });
                }
            }else{
                return res.status(400).json({
                    error: "Invalid file upload"
                });
            }
        } else{
            return res.status(400).json({
                error:"No file uploaded"
            });
        }
            */

        /*product.save((err, result) => {
            if (err) {
                console.error("Error saving poduct:",err);
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        }); */

       const saveProduct = async (req,res)=>{
        try{
            const result = await product.save();
            res.json(result);
        }catch(err){
            console.error("Error saving product:",err);
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
       }

       saveProduct(req,res);


    });
};