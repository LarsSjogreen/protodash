var express = require('express');
var http = require('http');
var request = require('request');

var githubApi = require('github');

var github = new githubApi({
	version: "3.0.0",
	debug: false,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    timeout: 5000,
    headers: {
        "user-agent": "protodash" // GitHub is happy with a unique user agent
    }
});

var apicache = require('apicache').options({ debug: false }).middleware;
var app = express();

var passwordsJson = require('./local_config/secretpasswords');

app.use(express.static('../frontend'));

app.get('/pipedrive', function(req, res) {
//	res.send(passwordsJson.Pipedrive.url);
});

app.get('/checkins', apicache('5 minutes'), function(req, res) {
	setTimeout(function() {
		var jsonResponse = { name: 'RSR',
			 	data: { 
			 		date: new Date().toLocaleString(),
			 		checkinsWeek: 23
			 	}
			};
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(jsonResponse));
	}, 3000);
});

app.get('/checkReal', apicache('5 minutes'), function(req, res) {
	orgInfo('akvo', function(data) {
		res.send(data);
	});
});

app.listen(80, function () {
  console.log('Protodash server listening on port 80.');
});


// Trying out node-github. More info here: https://github.com/mikedeboer/node-github
// API documentation here: https://mikedeboer.github.io/node-github/
var orgInfo = function(orgName, returnFunc) {
	github.orgs.getMembers({
    		org: orgName
		}, function(err, res) {
			var retString = "Akvo team members: ";
			var userList = [];
			for (var i=0;i<res.length;i++) {
				userList.push(res[i].login);
			}
			retString += userList.join(', ');
    		returnFunc(JSON.stringify(retString));
	});
}