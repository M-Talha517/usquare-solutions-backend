const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Blog Schema
const blogSchema = new schema({
    picture:{
        type: String
    },
    title:{
        type: String
    },
    short_description:{
        type: String
    },
    body:{
        type: String
    },
    state:{
        type: String, default: "published"
    },
    date_time:{
        type: Date, default: Date.now 
    },
  
})


const blog= module.exports = mongoose.model('Blog',blogSchema);