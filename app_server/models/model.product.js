const mongoose = require('mongoose');

const schema = mongoose.Schema;

// product Schema
const productSchema = new schema({
    
    title:{
        type: String
    },
    picture:{
        type: String,
        default:''
    },
    description:{
        type: String
    },
    tool_technology:[
        {
            technology_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Technology',}
        }
    ],
    date_time:{
        type: Date, default: Date.now 
    },
    state:{
        type:String,
        default:"active"
    },
  
})


const Product= module.exports = mongoose.model('product',productSchema);