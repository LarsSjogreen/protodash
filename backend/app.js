var express = require('express');
var http = require('http');
var request = require('request');
var Pipedrive = require('pipedrive');
//var url = require('url');
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

var passwordsJson = require('./local_config/secretpasswords');

// https://www.npmjs.com/package/apicache
// https://github.com/kwhitley/apicache
var apicache = require('apicache').options({ debug: false }).middleware;

var app = express();

var pipedrive = new Pipedrive.Client(passwordsJson.Pipedrive.apikey);

app.use(express.static('../frontend'));

// Api docs here: https://developers.pipedrive.com/v1
// Node docs here: https://github.com/pipedrive/client-nodejs
app.get('/pipedrive', apicache('5 minutes'), function(req, res) {
	pipedrive.Deals.getAll({}, function (err, deals) {
		if (err) throw err;
		var totalDealsValue = 0;
		for (var i = 0; i < deals.length; i++) {
			totalDealsValue += deals[i].value;
		}
		var dealsValue = {
			valueOfSomeDeals: totalDealsValue
		};
		res.send(JSON.stringify(dealsValue));
	});
});

app.get('/checkins', apicache('5 minutes'), function(req, res) {
	setTimeout(function() {
		var jsonResponse = { 
				name: 'RSR',
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

app.get('/image', function(req, res) {
    request.get(req.query.url).pipe(res);
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
			var retString = "";
			var userList = [];
			for (var i=0;i<res.length;i++) {
				userList.push(res[i].login);
			}
			retString += userList.join(', ');
    		returnFunc(JSON.stringify(retString));
	});
}