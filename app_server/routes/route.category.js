var express = require('express');
var router = express.Router();

var category = require('../controllers/controller.category.js');

//Add category
router.post('/add',function (req, res) {
    var categoryForm = req.body;

    console.log(categoryForm)
    category.addCategory(categoryForm  ,function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Category form submitted successfully",
                status: true, 
                data: result
            });
        }

    });

});


//Get All category form list
router.get('/get_all', function (req, res) {
    category.getAllCategory(function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "category form Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No category form Exist",
                status: false,
                data: result
            });
        }
        
    });

});




//Update category form
router.patch('/update/:categoryId',function (req, res) {
    var categoryForm = req.body;
    var categoryId = req.params.categoryId;
    console.log(categoryForm)


    category.updateCategory(categoryId, categoryForm, {new: true}, function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Category form updated successfully",
                status: true, 
                data: result
            });
        }

    });

});

// Remove category By Id
router.get('/remove_by_id/:categoryId', function (req, res) {
    category.removeByid(req.params.categoryId, function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result){
            return res.json({
                message: "Category form data removed",
                status: true,
            });
        }
        else{
            return res.json({ 
                message: "Category form not removed",
                status: false
            });
        }
        
    });

});


module.exports = router;