
var blanketHeight = 20;
var blanketWidth = 19;
var blockWidth = 20;

function setup() {
	createCanvas(blanketWidth * blockWidth + 1, blanketHeight * blockWidth + 1);
	background(51);
	for (var y = 0; y < blanketHeight; y++) {
		for (var x = 0; x < blanketWidth; x++) {
			console.log(x + "," + y);
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

