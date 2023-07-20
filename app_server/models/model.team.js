const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Team Schema
const teamSchema = new schema({
    picture:{
        type: String
    },
    name:{
        type: String
    },
    job_title:{
        type: String
    },
    state:{
        type: String, default: "active"
    },
    date_time:{
        type: Date, default: Date.now 
    },
  
})


const Team= module.exports = mongoose.model('Team',teamSchema);