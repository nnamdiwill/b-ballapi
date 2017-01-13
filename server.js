var unirest = require('unirest');
var express = require('express');
var bodyParser = require('body-parser');
var events = require('events');

//var node = require("node");
var http = require('http');
var mongoose = require('mongoose');

var app = express();

//serves static files and uses json bodyparser
app.use(express.static('public'));
app.use(bodyParser.json());

// module.exports =function(query,callback) {
    
//api call between the server and basketball api   
var getBallTeam = function (team_name, args) {
 
 // console.log("inside the getBallTeam function");
 
    var emitter = new events.EventEmitter();
    
    unirest.post('http://api.probasketballapi.com/team?team_name='+team_name)
        .qs(args)
        //after api call we get the response inside the "response" parameter
        .end(function (response) {
         console.log(response);
            //success scenario
            if (response.ok) {
                emitter.emit('end', response.body);
            }
            //failure scenario
            else {
             //console.log("error line 28");
                emitter.emit('error', response.code);
            }
        });
    return emitter;
};
    
//api call between the view and the controller
app.get('/team/:team_name', function (request, response, error) {
 
 console.log("here");
 var apiOutput = " ";
  
  var ballTeamDetails = getBallTeam(request.params.team_name, {
        api_key: 'X1ae6KWniBjpucwfryJO4hIvtqmYMo2L'
    });

    //get the data from the first api call
    ballTeamDetails.on('end', function (item) {
     //console.log(item);
     //apiOutput = item;
    //return item;
    response.json(item);
     
     
    });

    //error handling
    ballTeamDetails.on('error', function (code) {
     //console.log("error line 54");
        response.sendStatus(code);
        
    });
    //return apiOutput;
});


 
 app.listen(process.env.PORT || 8080,function(){
   console.log("Server is log");
 });
