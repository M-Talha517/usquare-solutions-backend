const mongoose = require('mongoose');

const schema = mongoose.Schema;

// newsletter Schema
const newsletterSchema = new schema({
    email:{
        type: String, unique: true,
    },
    date_time:{
        type: Date, default: Date.now 
    },
  
})


const Newsletter= module.exports = mongoose.model('Newsletter',newsletterSchema);