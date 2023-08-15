var testimonial = require("../models/model.testimonial.js");

// Get All Category
module.exports.getAllTestimonial = (callback) => {
  testimonial
    .find({ state: { $ne: "deleted" } }, callback)
    .sort({ date_time: -1 });
};

// Add Category
module.exports.addTestimonial = async (categoryForm, callback) => {
  testimonial.create(categoryForm, callback);
};

// Update Category
module.exports.updateTestimonial = async (
  categoryId,
  categoryForm,
  options,
  callback
) => {
  var query = { _id: categoryId };
  testimonial.findOneAndUpdate(query, categoryForm, options, callback);
};

// Delete category
module.exports.removeByid = (id, callback) => {
  var query = { _id: id };
  testimonial.remove(query, callback);
};

// GET Testimonials For Landing Page
module.exports.getTestimonialsForLandingPage = (callback) => {
  testimonial
    .find({ blocked: { $ne: true } }, callback)
    .sort({ date_time: -1 })
    .limit(5);
};
