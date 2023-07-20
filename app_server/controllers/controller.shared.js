var user = require('../models/model.user.js');
var userController = require('./controller.user.js')
var userModel = require('../models/model.user.js')
var emailAccount = require('../../emails/account.js');

// Login
module.exports.login = (email, password, res) => {
    let record = new user();
    userModel.findOne({ email: email.toLowerCase().trim() }).
        exec(function (err, result) {
            if (err) {
                return res.json({ message: "Error in Connecting to DB", status: false, state: "error" });
            }
            else if (result) {
                console.log(password)
                console.log(result.password)
                console.log(record.comparePassword(password, result.password))
                if (result.state === 'blocked') {
                    return res.json({ message: "You Are Currently Blocked in our system. Kindly contact our supoort team.", status: false, state: "blocked" });
                }
                else if (result.state === 'deleted') {
                    return res.json({ message: "Your account is cancelled, contact admin to activate it.", status: false, state: "deleted" });
                }
                else if (result.state === 'pending') {
                    return res.json({ message: "Your account is still under review, kinldy try again in few hours.", status: false, state: "pending" });
                }
                else if (result.login_type != 'normal') {
                    return res.json({
                        status: true,
                        message: "Successfully Authenticated",
                        data: result
                    });
                }
                else if (record.comparePassword(password, result.password)) {
                    return res.json({
                        status: true,
                        message: "Successfully Authenticated",
                        data: result
                    });
                }
                else {
                    return res.json({ message: "Wrong Password", status: false });
                }

            }
            else {
                return res.json({ message: "Wrong Email", status: false });
            }
        });
}

//Send Verification Code - After User Registeration
module.exports.sendVerificationCode = (email, res) => {
    let record = new user();
    user.findOne({ email: email }).
        where('state').equals('unverified').
        exec(function (err, result) {
            if (err) {
                return res.status(500).json({ message: "Error in Connecting to DB", status: false });
            }
            else if (result) {
                let verification_code = Math.random() * (1000000 - 100000) + 100000;
                verification_code = Math.ceil(verification_code);
                userController.updateVerificationCode(email, verification_code, {
                    new: true
                }, function (err, user) {
                    if (err) {
                        return res.status(500).json({
                            message: "Error in Connecting to DB",
                            status: false
                        });
                    }
                    else if (user) {
                        emailAccount.sendVerificationMail(email, verification_code)
                        return res.json({ status: true, message: "Verification Code Sent, Kindly Check Email", data: user });
                    }

                });


            }
            else {
                return res.status(500).json({ message: "Wrong Email", status: false });

            }
        });
}

// Reset Password
module.exports.reset = (email, res) => {
    let record = new user();
    user.findOne({ email: email }).
        // where('state').equals('verified').
        exec(function (err, result) {
            if (err) {
                return res.status(500).json({ Message: "Error in Connecting to DB", status: false });
            }
            else if (result) {


                if (result.state == "verified") {

                    console.log(result)
                    let userName = result.first_name + " " + result.last_name;
                    var userId = result._id;
                    let password = Math.random() * (1000000 - 100000) + 100000;
                    password = Math.ceil(password);
                    console.log(password);

                    let customerform = {
                        password: password
                    }

                    userController.updateUser(userId, customerform, {
                        new: true
                    }, function (err, userUpdateResult) {
                        if (err) {
                            return res.status(500).json({
                                Message: "Error in Connecting to DB",
                                status: false
                            });
                        }
                        else if (userUpdateResult) {
                            // emailAccount.sendEmail(email,password)
                            var dynamic_template_data = {
                                userName: userName,
                                newPassword: password
                            }
                            console.log(dynamic_template_data)
                            // emailAccount.sendTemplate(email, 'fixthatdevice@gmail.com', 'd-78f22f9710634e94aaf5c626cfd45c8a', dynamic_template_data)
                            emailAccount.sendEmail(email, password);
                            return res.json({ message: "Password Updated, Kindly Check Your Email", status: true });
                        }

                    });

                }
                else if (result.state == "deleted") {
                    return res.json({ message: "Your Account is deleted", status: false });
                }
                else if (result.state == "blocked") {
                    return res.json({ message: "Your Account is blocked", status: false });
                }
                else if (result.state == "pending") {
                    return res.json({ message: "Your Account is pending account verification", status: false });
                }

            }
            else {
                return res.json({ message: "Wrong Email", status: false });

            }
        });
}
