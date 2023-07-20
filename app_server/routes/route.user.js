var express = require('express');
var router = express.Router();

var user = require('../controllers/controller.user.js');
var userModel =require('../models/model.user.js');


router.get('/',(req,res)=>
{
    res.json({
        message: "Welcome to User Route"
    })
})

// Signup for User
router.post('/signup_user', function (req, res) {
    var userform = req.body;
    userform.login_type = "normal"
    user.checkEmail(userform.email, function (err, result) {
        if (err) {
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        } else {
            if (result) {
                if(userform.login_type == "normal" && userform.email !== ""){
                    return res.json({
                        message: "Email Already Exists",
                        status: false
                    });
                }
                else if(userform.login_type == "social"){
                    return res.json({
                        message: "User Login successfully",
                        status: true, 
                        data: result
                    });
                }
                else if(userform.email == ""){
                    return res.json({
                        message: "Email is Required",
                        status: false, 
                    });
                }

            } else {

                    if(userform.login_type == "normal"){
                        user.addUser(userform, function (err, user) {
                            if (err) {
                                if (err.keyValue.mobile_number != null && err.name === "MongoError" && err.code === 11000) {
                                    console.log("Mobile Number must be unique");
                                    return res.json({
                                    message: "Mobile Number already in use",
                                    status: false
                                    });
                                  }
                                  else {
                                    return res.json({
                                    message: "Error in Connecting to DB",
                                    status: false
                                    });
                                  }
                            }
                            else if(user)
                            {   
                                return res.json({
                                    message: "User Registered successful",
                                    status: true, 
                                    data: user
                                });

                            }
                            
                        });
                    }
                    else{
                        user.addUserSocial(userform, function (err, user) {
                            if (err) {
                                if (err.keyValue.mobile_number != null && err.name === "MongoError" && err.code === 11000) {
                                    console.log("Mobile Number must be unique");
                                    return res.json({
                                    message: "Mobile Number already in use",
                                    status: false
                                    });
                                  }
                                  else {
                                    return res.json({
                                    message: "Error in Connecting to DB",
                                    status: false
                                    });
                                  } 
                            }
                            else if(user)
                            {   
                                return res.json({
                                    message: "User Registered successful",
                                    status: true, 
                                    data: user
                                });
                            }
                            
                        });
                    }

                    
                }
            }
        });

    });

    

//Get All User
router.get('/get_all_user', function (req, res) {
    user.getAllUser(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false, 
                data: []
            });
        }
        else if(result.length>0){
            return res.json({
                message: "User List",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No User Exist",
                status: false, 
                data: result
            });
        }
        
    });

});  

//Get All Verified User
router.get('/get_all_verified_user', function (req, res) {
    user.getAllVerifiedUser(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false, 
                data: []
            });
        }
        else if(result.length>0){
            return res.json({
                message: "User List",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No User Exist",
                status: false, 
                data: result
            });
        }
        
    });

});  

//Get All Vendor
router.get('/get_all_vendor', function (req, res) {
    user.getAllVendor(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false, 
                data: []
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Vendor List",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Vendor Exist",
                status: false, 
                data: result
            });
        }
        
    });

});   


//Get All Admin
router.get('/get_all_admin', function (req, res) {
    user.getAllUserAdmin(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Admin List",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Admin Exist",
                status: false
            });
        }
        
    });

});   


// Get User By Id
router.get('/get_by_id/:userId', function (req, res) {
    var userId = req.params.userId;
    console.log(userId)
    user.getUserById(userId, function (err, userResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(userResult){
            res.json({status: true, message: 'User Exist', data: userResult})
        }
        else{
            res.json({status: false, message: 'User Do not Exist'})
        }

    });

});


// Password Update
router.patch('/password_update_old_required/:userId', function (req, res) {
    var userId = req.params.userId;
    var oldPassword = req.body.old_password;
    var newPassword = req.body.new_password;

    user.passwordUpdateOldRequired(userId, oldPassword, newPassword, res)

});



// Update User Profile.
router.patch('/update_user/:userId', function (req, res) {
    var userId = req.params.userId;
    var userform = req.body;
    console.log(userform);

    if(userform.email){
        console.log("email update");
        user.checkEmailForUpdate(userform.email,userId, function (err, userExist) {
            if (err) {
                return res.status(500).json({
                    message: "Error in Connecting to DB",
                    status: false
                });
            }
            else{
                if(userExist && userform.email !== ""){
                    return res.json({
                        message: "Email Already Exists",
                        status: false
                    });
                }
                else{
    
                    user.updateUser(userId, userform, {
                        new: true
                    }, function (err, userResult) {
                        if (err) {
                            if (err.keyValue.mobile_number != null && err.name === "MongoError" && err.code === 11000) {
                                console.log("Mobile Number must be unique");
                                return res.json({
                                message: "Mobile Number already in use",
                                status: false
                                });
                              }
                              else {
                                return res.json({
                                message: "Error in Connecting to DB",
                                status: false
                                });
                              }
                        }
                        return res.json({
                            status: true,
                            message: "Profile Updated",
                            data: userResult
                        });
                
                    });
    
                }
            }
    
    
        });
    
    }
    else{
        console.log("email is not being updated");
        user.updateUser(userId, userform, {
            new: true
        }, function (err, userResult) {
            if (err) {
                if (err.keyValue.mobile_number != null && err.name === "MongoError" && err.code === 11000) {
                    console.log("Mobile Number must be unique");
                    return res.json({
                    message: "Mobile Number already in use",
                    status: false
                    });
                  }
                  else {
                    return res.json({
                    message: "Error in Connecting to DB",
                    status: false
                    });
                  }
            }
            return res.json({
                status: true,
                message: "Profile Updated",
                data: userResult
            });
    
        });
    }
    
});
 

module.exports = router;
