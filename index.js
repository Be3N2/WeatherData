// server.js
// Already set up for express

var express = require('express');
var app = express();
var APIrequest = require('request');
var fs = require('fs');

var simpleRequest = "https://api.darksky.net/forecast/f87eebf5030c5df083e9201182cb560c/41.1941795,-80.7491454?exclude=minutely,hourly,alerts,flags";
var saveLocation = "data.txt";

app.use(express.static('public'));

app.get("/", function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});


//app.get("/shorten/*", addUrl);                                    
var port = process.env.PORT || 3000;

// open port with a callback
var listener = app.listen(port, function () {
	console.log('Your app is listening on port ' + port);
});

app.get('/save', function(req, res){
	//explanation on stream object https://stackoverflow.com/questions/11447872/callback-to-handle-completion-of-pipe
	var stream = APIrequest(simpleRequest).pipe(fs.createWriteStream(saveLocation));
	stream.on('finish', function () { 
		res.sendFile(__dirname + '/public/saveScreen.html')
	});

});

app.get('/visualize', function(req, res){
	APIrequest(simpleRequest, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			// do more stuff
			console.log(info);
			res.send(info);
		}
	})
});