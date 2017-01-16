var unirest = require('unirest');
var express = require('express');
var bodyParser = require('body-parser');
var events = require('events');
var config = require('./config');
var Team = require('./models/team');

//var node = require("node");
var http = require('http');
var mongoose = require('mongoose');

var app = express();


//serves static files and uses json bodyparser
app.use(express.static('public'));
app.use(bodyParser.json());

/* STEP 2 - creating objects and constructors*/
var runServer = function (callback) {
    mongoose.connect(config.DATABASE_URL, function (err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function () {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function (err) {
        if (err) {
            console.error(err);
        }
    });
};

// module.exports =function(query,callback) {

//api call between the server and basketball api   
var getBallTeam = function(team_name, args) {

    // console.log("inside the getBallTeam function");

    var emitter = new events.EventEmitter();

    unirest.post('http://api.probasketballapi.com/team?team_name=' + team_name)
        .qs(args)
        //after api call we get the response inside the "response" parameter
        .end(function(response) {
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
app.get('/team/:team_name', function(request, response, error) {


    if (request.params.team_name == "") {
        response.json("Specify a team name");
    }
    else {

        var ballTeamDetails = getBallTeam(request.params.team_name, {
            api_key: 'X1ae6KWniBjpucwfryJO4hIvtqmYMo2L'
        });

        //get the data from the first api call
        ballTeamDetails.on('end', function(item) {
            //console.log(item);
            //apiOutput = item;
            //return item;
            response.json(item);


        });

        //error handling
        ballTeamDetails.on('error', function(code) {
            //console.log("error line 54");
            response.sendStatus(code);

        });
    }
    //second api call
    var getBallTeamPlayer = function(player_name, args) {

    // console.log("inside the getBallTeam function");

    var emitter2 = new events.EventEmitter();

    unirest.post('http://api.probasketballapi.com/player/last_name' + player_name)
        .qs(args)
        //after api call we get the response inside the "response" parameter
        .end(function(response) {
            console.log(response);
            //success scenario
            if (response.ok) {
                emitter2.emit('end', response.body);
            }
            //failure scenario
            else {
                //console.log("error line 28");
                emitter2.emit('error', response.code);
            }
        });
    return emitter2;
};

//api call between the view and the controller
app.get('/player/:last_name', function(request, response, error) {


    if (request.params.player_name == "") {
        response.json("Specify a plaers last name");
    }
    else {

        var ballPlayerDetails = getBallTeamPlayer(request.params.player_name, {
            api_key: 'X1ae6KWniBjpucwfryJO4hIvtqmYMo2L'
        });

        //get the data from the first api call
        ballPlayerDetails.on('end', function(item) {
            //console.log(item);
            //apiOutput = item;
            //return item;
            response.json(item);


        });

        //error handling
        ballPlayerDetails.on('error', function(code) {
            //console.log("error line 54");
            response.sendStatus(code);

        });
    }
    //Handling Database CRUD
    Team.find(function (err, teams) {
        if (err) {
            return response.status(500).json({
                message: 'Internal Server Error'
            });
        }
        response.status(200).json(teams);
    });
});

app.post('/team', function (req, res) {
    Team.create({
        name: req.body.name
    }, function (err, teams) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(teams);
    });
});


app.listen(process.env.PORT || 8080, function() {
    console.log("Server is log");
});
});