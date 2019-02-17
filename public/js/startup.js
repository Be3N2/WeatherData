
var blanketHeight = 20;
var blanketWidth = 19;
var blockWidth = 20;

var blue1 = "#667a86";
var teal1 = "#92b0a9";
var darkgreen1 = "#353708";
var green1 = "#9b9844";
var yellow1 = "#fdd57d";
var pink1 = "#d6a7b4";

//possible weather values
//clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night

function setup() {
	createCanvas(blanketWidth * blockWidth + 1, blanketHeight * blockWidth + 1);
	background(51);
	for (var y = 0; y < blanketHeight; y++) {
		for (var x = 0; x < blanketWidth; x++) {
			var colorCode;
			switch (Math.trunc(random(6))) {
				case 0:
					colorCode = yellow1;
					break;
				case 1:
					colorCode = darkgreen1;
					break;
				case 2:
					colorCode = green1;
					break;
				case 3:
					colorCode = teal1;
					break;
				case 4:
					colorCode = blue1;
					break;
				case 5:
				default:
					colorCode = pink1;
			}
			fill(colorCode);
			var locationx = x * blockWidth;
			var locationy = y * blockWidth;
			rect(locationx, locationy, blockWidth, blockWidth);


		}
	}	
	//UTC time is 5 hours ahead
	var date = new Date("28-May-2018 17:00:00");
	var unixtime = date.getTime()/1000;
	//one day 86400
	console.log(unixtime);
	console.log(unixtime + 86400);

	//daylight savings
	var date = new Date("3-Nov-2018 17:00:00");
	var unixtime = date.getTime()/1000;
	console.log(unixtime);
	console.log(unixtime + 86400);

	//28-May 14-Oct in Ravenna
	//15 Oct Today in Greensville
}


function draw() {
	
}
function mouseClicked() {

}

