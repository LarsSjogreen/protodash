var express = require('express');
var app = express();

var passwordsJson = require('./local_config/secretpasswords');

app.use(express.static('../frontend'));

app.get('/pipedrive', function(req, res) {
//	res.send(passwordsJson.Pipedrive.url);
});

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});