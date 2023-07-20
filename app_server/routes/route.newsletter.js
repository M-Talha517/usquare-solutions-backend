var express = require('express');
var router = express.Router();

var newsletter = require('../controllers/controller.newsletter.js');

//Add newsletter
router.post('/add',function (req, res) {
    var newsletterForm = req.body;

    console.log(newsletterForm)
    newsletter.addNewsletter(newsletterForm  ,function (err, result) {
        if (err) {
            console.log(err);
            if (err.keyValue.email != null && err.name === "MongoError" && err.code === 11000) {
                console.log("Email already exists");
                return res.json({
                message: "You Have Already Subscribed To Our Newsletter",
                status: false
                });
            } else{
                return res.json({
                    message: "Error in Connecting to DB",
                    status: false
                });
            }
            
        }
        else{
            return res.json({
                message: "Successfully Subscribed To Newsletter",
                status: true, 
                data: result
            });
        }

    });

});


//Get All newsletter form list
router.get('/get_all', function (req, res) {
    newsletter.getAllNewsletters(function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "newsletter form Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No newsletter form Exist",
                status: false,
                data: result
            });
        }
        
    });

});




//Update newsletter form
router.patch('/update/:newsletterId',function (req, res) {
    var newsletterForm = req.body;
    var newsletterId = req.params.newsletterId;
    console.log(newsletterForm)


    newsletter.updateNewsletter(newsletterId, newsletterForm, {new: true}, function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "newsletter form updated successfully",
                status: true, 
                data: result
            });
        }

    });

});

// Remove newsletter By Id
router.get('/remove_by_id/:newsletterId', function (req, res) {
    newsletter.removeByid(req.params.newsletterId, function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result){
            return res.json({
                message: "newsletter form data removed",
                status: true,
            });
        }
        else{
            return res.json({ 
                message: "newsletter form not removed",
                status: false
            });
        }
        
    });

});


module.exports = router;