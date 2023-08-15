const mongoose = require("mongoose");

const schema = mongoose.Schema;

// Career Schema
const careerSchema = new schema({
  title: {
    type: String,
  },
  position: {
    type: Number,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  body: {
    type: String,
  },
  state: {
    type: String,
    default: "active",
  },
  date_time: {
    type: Date,
    default: Date.now,
  },
  experience: {
    type: String,
  },
  jobType: {
    type: String,
  },
});

const Career = (module.exports = mongoose.model("Career", careerSchema));
