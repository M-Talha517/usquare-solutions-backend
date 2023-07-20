var express = require('express');
var router = express.Router();

var userModel =require('../app_server/models/model.user.js');


// Send notification 
// module.exports.sendNotification = async () => {
//     console.log("send notification", new Date());
//     query = {state: 'verified', user_type: 'patient', checkup_interval_start_date: {$exists: true}, checkup_interval: {$gt: 0}};
//     let userData = await userModel.find(query);
//     // console.log(userData);
//     let lastNotifDate;
//     let currentDate = new Date;
//     console.log("currentDate: ", currentDate, " formated Date: ", currentDate.toString().substr(0, 10))
//     for(let i = 0; i < userData.length; i++){
//         lastNotifDate = userData[i].checkup_interval_start_date;
//         let notificationData = await notificationModel.find({user_id: userData[i]._id}).sort([['date_time', -1]]).limit(1);
//         console.log("notificationData ",notificationData)
//         if(notificationData.length>0){
//             lastNotifDate = notificationData[0].date_time
//         }
//         let diffInMs   = new Date(currentDate.toString().substr(0, 10)) - new Date(lastNotifDate.toString().substr(0, 10))
//         let diffInDays = diffInMs / (1000 * 60 * 60 * 24);
//         diffInDays = diffInDays.toFixed(0);
//         if(diffInDays == userData[i].checkup_interval){
//             console.log("insert notification")
//             const reqData = {
//                 title: `Provider Interpretation: ${userData[i].full_name}`,
//                 description: `Kindly perform the Provider Interpretation for ${userData[i].full_name}, anytime in todays date: ${currentDate.toString().substr(0, 10)}`,
//                 user_id: userData[i]._id,
//             }
//             if(userData[i].assigned_provider_id){
//                 reqData['provider_id'] = userData[i].assigned_provider_id;
//             }
//             console.log("reqData ",reqData)
//             await notificationModel.create(reqData)
//         }
//         console.log("lastNotifDate",lastNotifDate ," : diffInDays: ",diffInDays)
//         console.log(i," : checkup interval: ",userData[i].checkup_interval, " name: ",userData[i].full_name)
//     }
//     // updateform = {daily_spin: 5};
//     // user.update(query, updateform, {multi: true} , function(err, res) {
//     //     if (err) {
//     //          console.log(err)
//     //     } 
//     //     else { 
//     //         console.log(res)
//     //     }
//     // });
// }

