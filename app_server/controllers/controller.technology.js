var technology =require('../models/model.technology.js');

// Get All technology
module.exports.getAllTechnology = (callback) =>  {
	technology.find({state: { $ne: 'deleted' } },callback)
	.sort({date_time: -1});
}

// Add technology
module.exports.addTechnology = async (technologyForm, callback) => {
	technology.create(technologyForm, callback);
}

// Update technology
module.exports.updateTechnology = async (technologyId, technologyForm, options, callback) => {
	var query = {_id: technologyId};
	technology.findOneAndUpdate(query, technologyForm, options, callback);
}

// Delete technology   
module.exports.removeByid = (id, callback) => {
    var query = {_id: id};
    technology.remove(query, callback)
}
