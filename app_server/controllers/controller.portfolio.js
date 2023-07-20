var portfolio =require('../models/model.portfolio.js');

// Get portfolio By Id
module.exports.getById = (id ,callback) =>  {
	portfolio.findOne({_id: id, state: 'active'}, callback)
	.populate({path:'category_id', select:[ 'name']});
}

// Get All portfolio by categoryId
module.exports.getAllPortfolioByCategoryId = (categoryId ,callback) => {
	portfolio.find({state: 'active', category_id: categoryId},callback)
	.populate({path:'category_id', select:[ 'name']})
	.sort({date_time: -1});
}


// Get All portfolio
module.exports.getAllPortfolio = (callback) =>  {
	portfolio.find({state: 'active'},callback)
	.populate({path:'category_id', select:[ 'name']})
	.sort({date_time: -1});
}

// Get All portfolio
module.exports.getRecentSixPortfolio = (callback) =>  {
	portfolio.find({state: 'active'},callback)
	.populate({path:'category_id', select:[ 'name']})
	.sort({date_time: -1})
	.limit(6);
}


// Add portfolio
module.exports.addPortfolio = async (portfolioForm, callback) => {
	portfolio.create(portfolioForm, callback);
}

// Update portfolio
module.exports.updatePortfolio = async (id, portfolioForm, options, callback) => {
	var query = {_id: id};
	portfolio.findOneAndUpdate(query, portfolioForm, options, callback);
}

// Delete portfolio   
module.exports.removeByid = (id, callback) => {
    var query = {_id: id};
    portfolio.remove(query, callback)
}
