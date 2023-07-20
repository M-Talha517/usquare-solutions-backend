var express = require('express');
var router = express.Router();

var career = require('../controllers/controller.career.js');

//Add career
router.post('/add',function (req, res) {
    var careerForm = req.body;

    console.log(careerForm)
    career.addCareer(careerForm  ,function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Career form submitted successfully",
                status: true, 
                data: result
            });
        }

    });

});

//Get All career form list
router.get('/get_all', function (req, res) {
    career.getAllCareer(function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "career form Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No career form Exist",
                status: false,
                data: result
            });
        }
        
    });

});

//Get top three career form list
router.get('/get_top_three_recent', function (req, res) {
    career.getTop3Careers(function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "career Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No career Exist",
                status: false,
                data: result
            });
        }
        
    });

});


//Get By Id
router.get('/get_by_id/:careerId', function (req, res) {
    career.getById(req.params.careerId ,function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "career form Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Career form Exist",
                status: false,
                data: result
            });
        }
        
    });

});

//Update career form
router.patch('/update/:careerId',function (req, res) {
    var careerForm = req.body;
    var careerId = req.params.careerId;
    console.log(careerForm)


    career.updateCareer(careerId, careerForm, {new: true}, function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "career form updated successfully",
                status: true, 
                data: result
            });
        }

    });

});

// Remove career By Id
router.get('/remove_by_id/:careerId', function (req, res) {
    career.removeByid(req.params.careerId, function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result){
            return res.json({
                message: "career form data removed",
                status: true,
            });
        }
        else{
            return res.json({ 
                message: "career form not removed",
                status: false
            });
        }
        
    });

});


module.exports = router;