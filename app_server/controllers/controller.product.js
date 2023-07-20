var product =require('../models/model.product.js');

// Get product By Id
module.exports.getById = (id ,callback) =>  {
	product.findOne({_id: id, state: 'active'}, callback);
}

// Get All product
module.exports.getAllProduct = (callback) =>  {
	product.find({state: 'active'},callback)
	.populate({path:'tool_technology.technology_id', select:[ 'name']});
}

// Add product
module.exports.addProduct = async (productForm, callback) => {
	product.create(productForm, callback);
}

// Update product
module.exports.updateProduct = async (id, productForm, options, callback) => {
	var query = {_id: id};
	product.findOneAndUpdate(query, productForm, options, callback);
}

// Delete product   
module.exports.removeByid = (id, callback) => {
    var query = {_id: id};
    product.remove(query, callback)
}
