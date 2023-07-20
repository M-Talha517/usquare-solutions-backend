var team =require('../models/model.team.js');

// Get All Team
module.exports.getAllTeams = (callback) =>  {
	team.find({state: { $ne: 'deleted' }},callback)
	.sort({date_time: -1});
}

// Get Top 3 Recent
module.exports.getTop3Teams = (callback) =>  {
	team.find({state: { $ne: 'deleted' }},callback)
	.sort({date_time: -1})
	.limit(3)
}

// Get team by id
module.exports.getTeamById = (id, callback) =>  {
	team.find({_id: id, state: { $ne: 'deleted' }},callback);
}

// Add team
module.exports.addTeam = async (teamForm, callback) => {
	team.create(teamForm, callback);
}

// Update team
module.exports.updateTeam = async (teamId, teamForm, options, callback) => {
	var query = {_id: teamId};
	team.findOneAndUpdate(query, teamForm, options, callback);
}

// Delete team   
module.exports.removeByid = (id, callback) => {
    var query = {_id: id};
    team.remove(query, callback)
}
