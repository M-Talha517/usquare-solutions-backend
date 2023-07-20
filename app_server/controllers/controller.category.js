var category =require('../models/model.category.js');

// Get All Category
module.exports.getAllCategory = (callback) =>  {
	category.find({state: { $ne: 'deleted' } },callback)
	.sort({date_time: -1});
}

// Add Category
module.exports.addCategory = async (categoryForm, callback) => {
	category.create(categoryForm, callback)
}

// Update Category
module.exports.updateCategory = async (categoryId, categoryForm, options, callback) => {
	var query = {_id: categoryId};
	category.findOneAndUpdate(query, categoryForm, options, callback);
}



// Delete category   
module.exports.removeByid = (id, callback) => {
    var query = {_id: id};
    category.remove(query, callback)
}
