var express = require('express');
var router = express.Router();

var team = require('../controllers/controller.team.js');
const mediaUpload = require("../../config/media_upload");

//Add team
router.post('/add',mediaUpload.fields([
    {
      name: 'picture', maxCount: 1
    }
  ]),function (req, res) {
    var teamForm = req.body;
    console.log(teamForm)
    if(req.files && req.files.picture){
        teamForm.picture = req.files.picture[0].location;
    }

    team.addTeam(teamForm  ,function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "team member added successfully",
                status: true, 
                data: result
            });
        }

    });

});


//Get All team member list
router.get('/get_all', function (req, res) {
    team.getAllTeams(function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "team member list exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No team member exist",
                status: false,
                data: result
            });
        }
        
    });

});

//Get All team form list
router.get('/get_top_three_recent', function (req, res) {
    team.getTop3Teams(function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "team member Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No team member Exist",
                status: false,
                data: result
            });
        }
        
    });

});


//Get All team form list
router.get('/get_by_id/:teamId', function (req, res) {
    team.getTeamById(req.params.teamId ,function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "team member Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No team member Exist",
                status: false,
                data: result
            });
        }
        
    });

});


//Update team form
router.patch('/update/:teamId', mediaUpload.fields([
    {
      name: 'picture', maxCount: 1
    }
  ]),function (req, res) {
    var teamForm = req.body;
    var teamId = req.params.teamId;
    console.log(teamForm)
    if(req.files && req.files.picture){
        teamForm.picture = req.files.picture[0].location;
    }

    team.updateTeam(teamId, teamForm, {new: true}, function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "team form updated successfully",
                status: true, 
                data: result
            });
        }

    });

});

// Remove team By Id
router.get('/remove_by_id/:teamId', function (req, res) {
    team.removeByid(req.params.teamId, function (err, result) {
        if (err) {
            console.log(err);
            return res.json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result){
            return res.json({
                message: "team member removed",
                status: true,
            });
        }
        else{
            return res.json({ 
                message: "team member not removed",
                status: false
            });
        }
        
    });

});


module.exports = router;