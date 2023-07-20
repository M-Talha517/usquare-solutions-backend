var express = require('express');
var router = express.Router();

var blog = require('../controllers/controller.blog.js');
const mediaUpload = require("../../config/media_upload");

//Add blog
router.post('/add',mediaUpload.fields([
    {
      name: 'picture', maxCount: 1
    }
  ]),function (req, res) {
    var blogForm = req.body;
    console.log(blogForm)
    if(req.files && req.files.picture){
        blogForm.picture = req.files.picture[0].location;
    }

    blog.addBlog(blogForm  ,function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Blog created successfully",
                status: true, 
                data: result
            });
        }

    });

});


//Get All blog form list
router.get('/get_all', function (req, res) {
    blog.getAllBlogs(function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "blog form Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No blog form Exist",
                status: false,
                data: result
            });
        }
        
    });

});

//Get All blog form list
router.get('/get_top_three_recent', function (req, res) {
    blog.getTop3Blogs(function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "blog form Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No blog form Exist",
                status: false,
                data: result
            });
        }
        
    });

});


//Get All blog form list
router.get('/get_by_id/:blogId', function (req, res) {
    blog.getBlogById(req.params.blogId ,function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "blog form Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No blog form Exist",
                status: false,
                data: result
            });
        }
        
    });

});


//Update blog form
router.patch('/update/:blogId', mediaUpload.fields([
    {
      name: 'picture', maxCount: 1
    }
  ]),function (req, res) {
    var blogForm = req.body;
    var blogId = req.params.blogId;
    console.log(blogForm)
    if(req.files && req.files.picture){
        blogForm.picture = req.files.picture[0].location;
    }

    blog.updateBlog(blogId, blogForm, {new: true}, function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "blog form updated successfully",
                status: true, 
                data: result
            });
        }

    });

});

// Remove blog By Id
router.get('/remove_by_id/:blogId', function (req, res) {
    blog.removeByid(req.params.blogId, function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result){
            return res.json({
                message: "blog form data removed",
                status: true,
            });
        }
        else{
            return res.json({ 
                message: "blog form not removed",
                status: false
            });
        }
        
    });

});


module.exports = router;