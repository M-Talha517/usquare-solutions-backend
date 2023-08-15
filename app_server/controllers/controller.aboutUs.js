var AboutUs = require("../models/model.aboutUs.js");

// Get All Category
module.exports.getAllAboutUs = (callback) => {
  AboutUs.find({ state: { $ne: "deleted" } }, callback);
};

// Update Category
module.exports.updateAboutUs = async (categoryForm, callback) => {
  AboutUs.findOneAndUpdate(query, categoryForm, options, callback);
};
