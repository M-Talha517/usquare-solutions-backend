var express = require('express');
var router = express.Router();

var contact = require('../controllers/controller.contact.js');

//Add contact
router.post('/add',function (req, res) {
    var contactForm = req.body;

    console.log(contactForm)
    contact.addContact(contactForm  ,function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Form Submitted Successfully, Our Representative Will Get In Touch With You In Few Hours",
                status: true, 
                data: result
            });
        }

    });

});


//Get All contact form list
router.get('/get_all', function (req, res) {
    contact.getAllContacts(function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "contact form Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No contact form Exist",
                status: false,
                data: result
            });
        }
        
    });

});




//Update contact form
router.patch('/update/:contactId',function (req, res) {
    var contactForm = req.body;
    var contactId = req.params.contactId;
    console.log(contactForm)


    contact.updateContact(contactId, contactForm, {new: true}, function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Contact form updated successfully",
                status: true, 
                data: result
            });
        }

    });

});

// Remove contact By Id
router.get('/remove_by_id/:contactId', function (req, res) {
    contact.removeByid(req.params.contactId, function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result){
            return res.json({
                message: "Contact form data removed",
                status: true,
            });
        }
        else{
            return res.json({ 
                message: "Contact form not removed",
                status: false
            });
        }
        
    });

});


module.exports = router;