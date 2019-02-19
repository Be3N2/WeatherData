
var blanketHeight = 20;
var blanketWidth = 19;
var blockWidth = 20;

var blue1 = "#667a86";
var teal1 = "#92b0a9";
var darkgreen1 = "#353708";
var green1 = "#9b9844";
var yellow1 = "#fdd57d";
var pink1 = "#d6a7b4";

var data = {};
var greenvilledata = {};

function preload() {
  // preload() runs once
  data = loadJSON('/getdata');
  greenvilledata = loadJSON('/greenvilledata');
}

function setup() {
	print(data);
	print(greenvilledata);
	createCanvas(blanketWidth * blockWidth + 1, blanketHeight * blockWidth + 1);
	background(51);
	for (var y = 0; y < blanketHeight; y++) {
		for (var x = 0; x < blanketWidth; x++) {
			
			//basic structure of the data in the file
			//{"location": "Ravenna, OH","startDate": "28-May-2018","endDate": "14-Oct-2018","weatherData":[]};

			var colorCode;
			var icon = "fill";
			if (x + y * blanketWidth < data.weatherData.length) {
				icon = data.weatherData[x + y * blanketWidth].data.currently.icon;
			} else if(x + y * blanketWidth >= data.weatherData.length) {
				index = (x + y * blanketWidth) - data.weatherData.length;
				if (index < greenvilledata.weatherData.length)
					icon = greenvilledata.weatherData[index].data.currently.icon;
			} 
				
				//icon = data.weatherData[x + y * blanketWidth].data.daily.data[0].icon;
				//possible icon values
				//clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
				switch (icon) {
					case "clear-day":
					case "clear-night":
						colorCode = yellow1;
						break;
					case "rain":
					case "snow":
						colorCode = teal1;
						break;
					case "wind":
						colorCode = green1;
						break;
					case "sleet":
					case "fog":
						colorCode = blue1;
						break;
					case "cloudy":
						colorCode = darkgreen1;
						break;
					case "partly-cloudy-day":
					case "partly-cloudy-night":
						colorCode = pink1;
						break;
					case "fill":
						colorCode = "#ffffff";
						break;
					default:
						console.log("SOME OTHER ICON VALUE: " + icon);
						colorCode = "#000000";
				}
			
				
				
			
			fill(colorCode);
			var locationx = x * blockWidth;
			var locationy = y * blockWidth;
			rect(locationx, locationy, blockWidth, blockWidth);
		}

	}
}	
	



function draw() {
	
}

function mouseClicked() {

}
