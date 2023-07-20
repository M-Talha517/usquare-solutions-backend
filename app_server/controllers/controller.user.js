var user =require('../models/model.user.js');
var ObjectId = require('mongodb').ObjectID;

// Add User (Signup)
module.exports.addUser = async (userform, callback) => {
    let record=new user();
    userform.password=record.hashPassword(userform.password);
    userform.email=userform.email.toLowerCase().trim() || "";
    if(userform.user_type == 'vendor'){
        userform.state = 'pending'
    }
    user.create(userform, callback);
}

// Add Social User 
module.exports.addUserSocial = (userform, callback) =>  {
    let record=new user();
    userform.password=record.hashPassword("9753845");
    userform.email=userform.email.toLowerCase().trim() || "";
    if(userform.user_type == 'vendor'){
        userform.state = 'pending'
    }
    user.create(userform, callback);
}

// Check email exists
module.exports.checkEmail = (email,callback) => {
	user.findOne({email: email.toLowerCase().trim()},callback);
}

// Check email exists
module.exports.checkEmailForUpdate = (email, user_id, callback) => {
    // user.findOne({email:email, _id: { $ne: user_id } },callback);
    user.findOne({email:{'$regex':`^${email}$`, $options:'i'}, _id: { $ne: user_id } },callback);
}


// Update User
module.exports.updateUser = async (userId, userform, options, callback) => {
    var query = {_id: userId};

    let record=new user();
    if(userform.password)
    {
        userform.password=record.hashPassword(userform.password);
    }
    
    user.findOneAndUpdate(query, userform, options, callback);
}


// Get User By ID
module.exports.getUserById = (userId, callback) => {
	user.findOne({_id: userId}, callback);
}

// Get All Users 
module.exports.getAllUser = (callback) => {
	user.find({state: { $ne: 'deleted' }, user_type:"user"}, callback);
}

// Get All Verified Users 
module.exports.getAllVerifiedUser = (callback) => {
	user.find({state: "verified", user_type:"user"}, callback);
}

// Get All Vendor
module.exports.getAllVendor = (callback) => {
	user.find({state: { $ne: 'deleted' }, user_type:"vendor"}, callback);
}

// Get All Admin
module.exports.getAllUserAdmin = (callback) => {
	user.find({state: { $ne: 'deleted' }, user_type:"admin"}, callback);
}

// Get User By ID async / await
module.exports.getUserByIdAsyncAwait = (userId, callback) => {
	return user.findOne({_id: userId}, callback).exec();
}



// Password Update old password required
module.exports.passwordUpdateOldRequired = (userId,oldPassword,newPassword, res) => {
    let record=new user();
    user.findOne({_id:userId}).
    exec(function(err,result)
    {
        if (err)
		{
			return res.json({message:"Error in Connecting to DB",status:false, state: "error"});
		}
        else if(result)
        {

            if(record.comparePassword(oldPassword,result.password))
            {
                result.password = record.hashPassword(newPassword);
                result.save();
                return res.json({message:"Password Updated Successfully",status:true});
            }
            else
			{
				return res.json({message:"Old Password is not correct",status:false});
			}

        }
        else
        {
            return res.json({message:"User Id Invalid",status:false});    
        }
    });
}
