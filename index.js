// server.js
// Already set up for express

var express = require('express');
var app = express();
var APIrequest = require('request');
var fs = require('fs');
var async = require('async');
var simpleRequest = "https://api.darksky.net/forecast/f87eebf5030c5df083e9201182cb560c/41.1941795,-80.7491454?exclude=minutely,hourly,alerts,flags";
var saveLocation = "data.txt";

app.use(express.static('public'));

app.get("/", function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

const monthNames = ["January", "February", "March", "April", "May", "June",
	  "July", "August", "September", "October", "November", "December"
];

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
	APIrequest("https://api.darksky.net/forecast/f87eebf5030c5df083e9201182cb560c/41.1575566,-81.2420473,1539550800?exclude=minutely,hourly,alerts,flags", function (error, response, body) {
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
	var ravennaWeather = {"location": "Ravenna, OH","startDate": "28-May-2018","endDate": "14-Oct-2018","weatherData":[]};
	
	var ravennaFirstPart = "https://api.darksky.net/forecast/f87eebf5030c5df083e9201182cb560c/41.1575566,-81.2420473,";
	var ravennaSecondPart = "?exclude=minutely,hourly,alerts,flags";

	var startDate = new Date("28-May-2018 17:00:00");
	var unixStartTime = startDate.getTime()/1000;

	var endDate = new Date("14-Oct-2018 17:00:00");
	var unixEndTime = endDate.getTime()/1000;

	//var ravennaRequests = buildRequests(ravennaFirstPart, ravennaSecondPart, unixStartTime, unixEndTime)
	//var ravennaRequests = [];
	//ravennaRequests.push({"unixTime": unixStartTime,"request": ravennaFirstPart + unixStartTime + ravennaSecondPart});
	endDate = new Date("29-May-2018 17:00:00");
	unixEndTime = endDate.getTime()/1000;
	var ravennaRequests = buildRequests(ravennaFirstPart, ravennaSecondPart, unixStartTime, unixEndTime)

	//Theres also the async package with async.forEachOfSeries();
	//https://github.com/caolan/async/blob/v1.5.2/README.md
	//https://stackoverflow.com/questions/35258277/difference-between-async-each-and-async-eachseries
	async.eachSeries(ravennaRequests, function iterator(item, callback) {
		var date = new Date(item.unixTime * 1000);
	  	var daymonthyear = date.getDate() + "-" + monthNames[date.getMonth()] + "-" + date.getFullYear();
		var input = {"day": daymonthyear,"unixTime": item.unixTime,"request": item.request, "data": {}};

		APIrequest(item.request, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);
				// do more stuff
				input.data = info;
				ravennaWeather.weatherData.push(input);
				callback();
			}
		});
		
	}, function done() {
	  	//All data recieved: write data
		var ravennaSave = "ravenna.txt";
		fs.writeFile(ravennaSave, JSON.stringify(ravennaWeather), function(err) {
		    if(err) {
		        return console.log(err);
		    }

		    console.log("The file was saved!");
		}); 

		res.send(ravennaWeather);
	});
	
});

function buildRequests(firstPart, secondPart, unixStartTime, unixEndTime) {
	var allRequests = [];

	for (var i = unixStartTime; i <= unixEndTime; i += 86400) {
		var step = new Date(i * 1000);
		//console.log(step.getDate() + "-" + monthNames[step.getMonth()] + "-" + step.getFullYear() + " " + step.getHours());
		var singleRequest = firstPart + i + secondPart;
		allRequests.push({"unixTime": i, "request": singleRequest});
		//console.log(singleRequest);
	}
	return allRequests;
}