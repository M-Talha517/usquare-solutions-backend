var blog =require('../models/model.blog.js');

// Get All blog
module.exports.getAllBlogs = (callback) =>  {
	blog.find({state: { $ne: 'deleted' }},callback)
	.sort({date_time: -1});
}

// Get Top 3 Recent
module.exports.getTop3Blogs = (callback) =>  {
	blog.find({state: { $ne: 'deleted' }},callback)
	.sort({date_time: -1})
	.limit(3)
}

// Get blog by id
module.exports.getBlogById = (id, callback) =>  {
	blog.find({_id: id, state: { $ne: 'deleted' }},callback);
}

// Add blog
module.exports.addBlog = async (blogForm, callback) => {
	blog.create(blogForm, callback);
}

// Update blog
module.exports.updateBlog = async (blogId, blogForm, options, callback) => {
	var query = {_id: blogId};
	blog.findOneAndUpdate(query, blogForm, options, callback);
}

// Delete blog   
module.exports.removeByid = (id, callback) => {
    var query = {_id: id};
    blog.remove(query, callback)
}
