const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Contact Schema
const contactSchema = new schema({
    service_name:{
        type: String
    },
    first_name:{
        type: String
    },
    last_name:{
        type: String
    },
    email:{
        type: String
    },
    phone_number:{
        type: String, default: ""
    },
    project_description:{
        type: String, default: ""
    },
    state:{
        type: String, default: "pending"
    },
    date_time:{
        type: Date, default: Date.now 
    },
  
})


const Contact= module.exports = mongoose.model('Contact',contactSchema);