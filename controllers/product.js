const formidable = require("formidable")
const _ = require("lodash");
const fs = require("fs")
const Product = require("../models/product")
const { errorHandler } = require("../helpers/dbErrorHandler")

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        let product = new Product(fields);

        //log files object to see if the photo property exists and has a path
        console.log("Files: ", files);
        console.log("Fields: ", fields);


        if (files.photo) {
            try {
                product.photo.data = fs.readFileSync(files.photo.path);
                product.photo.contentType = files.photo.type;
            } catch (readError) {
                console.error("Error reading the uploaded file:", readError);
                return res.status(400).json({
                    error: "Error reading the uploaded file",
                    details: readError.message
                });
            }
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });

    });
};