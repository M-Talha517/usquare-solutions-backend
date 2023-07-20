const mongoose = require('mongoose');

const schema = mongoose.Schema;

// portfolio Schema
const portfolioSchema = new schema({
    title:{
        type: String
    },
    project_link:{
        type: String
    },
    picture:{
        type: String,
        default:""
    },
    description:{
        type: String
    },
    category_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
    },
    date_time:{
        type: Date, default: Date.now 
    },
    state:{
        type:String,
        default:"active"
    }
  
})


const Portfolio= module.exports = mongoose.model('Portfolio',portfolioSchema);