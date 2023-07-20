var express = require('express');
var router = express.Router();

var technology = require('../controllers/controller.technology.js');

//Add technology
router.post('/add',function (req, res) {
    var technologyForm = req.body;

    console.log(technologyForm)
    technology.addTechnology(technologyForm  ,function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "technology form submitted successfully",
                status: true, 
                data: result
            });
        }

    });

});


//Get All technology form list
router.get('/get_all', function (req, res) {
    technology.getAllTechnology(function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "technology form Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No technology form Exist",
                status: false,
                data: result
            });
        }
        
    });

});




//Update technology form
router.patch('/update/:technologyId',function (req, res) {
    var technologyForm = req.body;
    var technologyId = req.params.technologyId;
    console.log(technologyForm)


    technology.updateTechnology(technologyId, technologyForm, {new: true}, function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "technology form updated successfully",
                status: true, 
                data: result
            });
        }

    });

});

// Remove technology By Id
router.get('/remove_by_id/:technologyId', function (req, res) {
    technology.removeByid(req.params.technologyId, function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result){
            return res.json({
                message: "technology form data removed",
                status: true,
            });
        }
        else{
            return res.json({ 
                message: "technology form not removed",
                status: false
            });
        }
        
    });

});


module.exports = router;