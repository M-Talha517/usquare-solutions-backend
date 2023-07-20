var express = require('express');
var router = express.Router();

var product = require('../controllers/controller.product.js');
const mediaUpload = require("../../config/media_upload");

//Add product
router.post('/add', mediaUpload.fields([
    {
      name: 'picture', maxCount: 1
    }
  ]),function (req, res) {
    var productForm = req.body;
    console.log(productForm)

    if(req.files.picture){
        productForm.picture = req.files.picture[0].location;
    }

    if(productForm.tool_technology){
        productForm.tool_technology = JSON.parse(productForm.tool_technology);
    }

    product.addProduct(productForm  ,function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "product Added successfully",
                status: true, 
                data: result
            });
        }

    });


});


//Get All Attendance Location List
router.get('/get_all', function (req, res) {
    product.getAllProduct(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "product Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No product Exist",
                status: false,
                data: result
            });
        }
        
    });

});



//Get By Id
router.get('/get_by_id/:dataId', function (req, res) {
    product.getById(req.params.dataId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "product Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No product Exist with this id",
                status: false
            });
        }
        
    });

});


//Update product
router.patch('/update/:id', mediaUpload.fields([
    {
      name: 'picture', maxCount: 1
    }
  ]),function (req, res) {
    var productForm = req.body;
    var id = req.params.id;
    console.log(productForm)

    if(req.files.picture){
        productForm.picture = req.files.picture[0].location;
    }

    if(productForm.tool_technology){
        productForm.tool_technology = JSON.parse(productForm.tool_technology);
    }
    
    product.updateProduct(id, productForm, {new: true}, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Riddle Location Updated successfully",
                status: true, 
                data: result
            });
        }

    });

});




module.exports = router;