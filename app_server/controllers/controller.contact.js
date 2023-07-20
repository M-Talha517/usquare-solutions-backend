var contact =require('../models/model.contact.js');

// Get All Contact
module.exports.getAllContacts = (callback) =>  {
	contact.find({state: { $ne: 'deleted' }},callback)
	.sort({date_time: -1});
}

// Add Contact
module.exports.addContact = async (contactForm, callback) => {
	contact.create(contactForm, callback);
}


// Update Contact
module.exports.updateContact = async (contactId, contactForm, options, callback) => {
	var query = {_id: contactId};
	contact.findOneAndUpdate(query, contactForm, options, callback);
}



// Delete contact   
module.exports.removeByid = (id, callback) => {
    var query = {_id: id};
    contact.remove(query, callback)
}
