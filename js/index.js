var express = require("express");

//var node = require("node");
var http = require('http');
var mongoose = require('mongoose');

var appl = express();

// module.exports =function(query,callback) {
    
  var request = require('request');
request.post('http://api.probasketballapi.com/team?team_abbrv=GSW&api_key=X1ae6KWniBjpucwfryJO4hIvtqmYMo2L', function (error, response, body) {
  if (!error && response.statusCode == 200) {
      var key = X1ae6KWniBjpucwfryJO4hIvtqmYMo2L;
   
   console.log(body)
  }
});


// function getTeamInfo(userInput){
    
//     $.getJSON('https://probasketballapi.com/docs/v2/teams',
//     { key: X1ae6KWniBjpucwfryJO4hIvtqmYMo2L ,
//     query1 : userInput
    
// },

// function (recieveAPIData) {
    
//     if (recieveAPIData.statusCode == 200) {
//         console.log(recieveAPIData);
//     }
//     else {
//         console.log("Problem found");
//     }
// }
 
 appl.listen(process.env.PORT || 8080);
