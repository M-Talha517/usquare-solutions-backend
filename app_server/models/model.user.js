const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const schema = mongoose.Schema;

// User Schema

const userSchema = new schema({
    user_type:{
        type:String // user, vendor 
    },
    login_type:{
        type:String // normal, social
    },
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    company_name:{
        type:String // vendor only field
    },
    business_typology:{
        type:String // vendor only field
    },
    position:{
        type:String // vendor only field
    },
    business_opening_hours:{
        type:String // vendor only field
    },
    mobile_number:{
        type:String,
        unique:true
    },
    profile_picture:{
        type:String
    },
    shop_address:{
        type: String
    },
    latitude:{
        type: Number
    },
    longitude:{
        type: Number
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    date_time:{
        type: Date, default: Date.now 
    },
    state:{
        type:String,
        default:"verified"
    },
   

})
userSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}
userSchema.methods.comparePassword = function(password,hash){
    return bcrypt.compareSync(password,hash)
}

const user= module.exports = mongoose.model('User',userSchema);