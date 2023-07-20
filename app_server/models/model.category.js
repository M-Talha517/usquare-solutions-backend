const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Category Schema
const categorySchema = new schema({
    name:{
        type: String
    },
    description:{
        type: String
    },
    state:{
        type: String, default: "active"
    },
    date_time:{
        type: Date, default: Date.now 
    },
  
})


const Category= module.exports = mongoose.model('Category',categorySchema);