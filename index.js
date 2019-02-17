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
		res.sendFile(__dirname + '/public/saveScreen.html');
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

app.get('/ravenna', function(req, res){
	//loop ravenna calls
	var ravennaWeather = {"weatherData":[]};
	const monthNames = ["January", "February", "March", "April", "May", "June",
	  "July", "August", "September", "October", "November", "December"
	];
	var ravennaFirstPart = "https://api.darksky.net/forecast/f87eebf5030c5df083e9201182cb560c/41.1575566,-81.2420473,";
	var ravennaSecondPart = "?exclude=minutely,hourly,alerts,flags";

	var date = new Date("28-May-2018 17:00:00");
	var unixtime = date.getTime()/1000;

	//for loop start
	//decide on exact time
	var ravennaRequest = ravennaFirstPart + unixtime + ravennaSecondPart;
	var daymonthyear = date.getDate() + "-" + monthNames[date.getMonth()] + "-" + date.getFullYear();
	var input = {"day": daymonthyear,"unixTime": unixtime, "data": {}};

	APIrequest(ravennaRequest, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			// do more stuff
			input.data = info;
		}
	});
	ravennaWeather.weatherData[0] = input;
	//for loop end

	//write data
	var ravennaSave = "ravenna.txt";
	fs.writeFile(ravennaSave, JSON.stringify(ravennaWeather), function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	}); 

	res.send(ravennaWeather);
});