const mongoose = require("mongoose");

const schema = mongoose.Schema;

const testimonialSchema = new schema({
  blocked: { type: Boolean, default: false },
  image: { type: String, required: true },
  name: { type: String, required: true },
  designation: { type: String, required: true },
  testimonial: { type: String, required: true },
  date_time: { type: Date, default: Date.now },
});

const Testimonial = (module.exports = mongoose.model(
  "Testimonial",
  testimonialSchema
));
