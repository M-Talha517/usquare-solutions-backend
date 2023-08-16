var express = require("express");
var router = express.Router();

var blog = require("../controllers/controller.aboutUs.js");
//Get All blog form list
router.get("/get_all", function (req, res) {
  blog.getAllBlogs(function (err, result) {
    if (err) {
      console.log(err);
      return res.json({
        message: "Error in Connecting to DB",
        status: false,
      });
    } else if (result.length > 0) {
      return res.json({
        message: "Contact Us Data Exists",
        status: true,
        data: result,
      });
    } else {
      return res.json({
        message: "No Data Exist",
        status: false,
        data: result,
      });
    }
  });
});
