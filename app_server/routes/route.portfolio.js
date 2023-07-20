var express = require('express');
var router = express.Router();

var portfolio = require('../controllers/controller.portfolio.js');
const mediaUpload = require("../../config/media_upload");

//Add portfolio
router.post('/add', mediaUpload.fields([
    {
      name: 'picture', maxCount: 1
    }
  ]),function (req, res) {
    var portfolioForm = req.body;
    console.log(portfolioForm)

    if(req.files.picture){
        portfolioForm.picture = req.files.picture[0].location;
    }

    portfolio.addPortfolio(portfolioForm  ,function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Portfolio Added successfully",
                status: true, 
                data: result
            });
        }

    });


});


//Get All Portfolio List
router.get('/get_all', function (req, res) {
    portfolio.getAllPortfolio(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Portfolio Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Portfolio Exist",
                status: false,
                data: result
            });
        }
        
    });

});

//Get Recent Six Portfolio List
router.get('/get_recent_six', function (req, res) {
    portfolio.getRecentSixPortfolio(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Portfolio Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Portfolio Exist",
                status: false,
                data: result
            });
        }
        
    });

});

//Get All by CategoryId
router.get('/get_by_categoryid/:categoryId', function (req, res) {
    portfolio.getAllPortfolioByCategoryId(req.params.categoryId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "portfolio Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No portfolio Exist with this id",
                status: false,
                data: []
            });
        }
        
    });

});

//Get By Id
router.get('/get_by_id/:dataId', function (req, res) {
    portfolio.getById(req.params.dataId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "portfolio Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No portfolio Exist with this id",
                status: false
            });
        }
        
    });

});


//Update portfolio
router.patch('/update/:id', mediaUpload.fields([
    {
      name: 'picture', maxCount: 1
    }
  ]),function (req, res) {
    var portfolioForm = req.body;
    var id = req.params.id;
    console.log(portfolioForm)

    if(req.files.picture){
        portfolioForm.picture = req.files.picture[0].location;
    }

    portfolio.updatePortfolio(id, portfolioForm, {new: true}, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Riddle Location Updated successfully",
                status: true, 
                data: result
            });
        }

    });

});




module.exports = router;