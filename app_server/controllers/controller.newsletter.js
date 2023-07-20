var newsletter =require('../models/model.newsletter.js');

// Get All newsletter
module.exports.getAllNewsletters = (callback) =>  {
	newsletter.find({state: { $ne: 'deleted' }},callback)
	.sort({date_time: -1});
}

// Add newsletter
module.exports.addNewsletter = async (newsletterForm, callback) => {
	newsletter.create(newsletterForm, callback);
}


// Update newsletter
module.exports.updateNewsletter = async (newsletterId, newsletterForm, options, callback) => {
	var query = {_id: newsletterId};
	newsletter.findOneAndUpdate(query, newsletterForm, options, callback);
}



// Delete newsletter   
module.exports.removeByid = (id, callback) => {
    var query = {_id: id};
    newsletter.remove(query, callback)
}
