const mongoose = require('mongoose');

const schema = mongoose.Schema;

// technology Schema
const technologySchema = new schema({
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


const technology= module.exports = mongoose.model('Technology',technologySchema);