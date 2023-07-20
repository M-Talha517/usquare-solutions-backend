var career =require('../models/model.career.js');

// Get All career
module.exports.getAllCareer = (callback) =>  {
	career.find({state: { $ne: 'deleted' } },callback)
	.sort({date_time: -1})
	.populate({path:'category_id', select:[ 'name']});
}

// Get Career by id
module.exports.getById = (id, callback) =>  {
	career.find({_id: id, state: { $ne: 'deleted' }},callback)
	.populate({path:'category_id', select:[ 'name']});
}

// Get Top 3 Recent Careers
module.exports.getTop3Careers = (callback) =>  {
	career.find({state: { $ne: 'deleted' }},callback)
	.populate({path:'category_id', select:[ 'name']})
	.sort({date_time: -1})
	.limit(3)
}

// Add career
module.exports.addCareer = async (careerForm, callback) => {
	career.create(careerForm, callback)
}

// Update career
module.exports.updateCareer = async (careerId, careerForm, options, callback) => {
	var query = {_id: careerId};
	career.findOneAndUpdate(query, careerForm, options, callback);
}



// Delete career   
module.exports.removeByid = (id, callback) => {
    var query = {_id: id};
    career.remove(query, callback)
}
