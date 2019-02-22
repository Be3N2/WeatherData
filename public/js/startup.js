var data;
var weatherData = [];
const w = 500;
const h = 500;
const rowWidth = 19;
const rowHeight = 20;
const squareWidth = w/rowWidth;

var blue1 = "#667a86";
var teal1 = "#92b0a9";
var darkgreen1 = "#353708";
var green1 = "#9b9844";
var yellow1 = "#fdd57d";
var pink1 = "#d6a7b4";

function fetchData(url)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", url, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                data = JSON.parse(rawFile.responseText);
                weatherData = data.weatherData;
                console.log(data);
                start();
            }
        }
    }
    rawFile.send(null);
}

fetchData("http://localhost:3000/getdata");

function start() {
    const svg = d3.select("body")
              .append("svg")
              .attr("width", w)
              .attr("height", h)
              .attr("class", "svg");
    svg.selectAll("rect")
        .data(weatherData)
        .enter()
        .append("rect")
        .attr("x", (d, i) => {
            return (i % rowWidth) * squareWidth;
        })
        .attr("y", (d, i) => {
            return Math.floor(i / rowWidth) * squareWidth;
        })
        .attr("width", squareWidth)
        .attr("height", squareWidth)
        .attr("fill", (d) => {
            return findColor(d.data.currently.icon);
        })
        .append("title")
        .text((d) => d.day);
}

function findColor(icon) {
    var colorCode;
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
            colorCode = pink1;
            break;
        case "partly-cloudy-day":
        case "partly-cloudy-night":
            colorCode = darkgreen1;
            break;
        case "fill":
            colorCode = "#ffffff";
            break;
        default:
            console.log("SOME OTHER ICON VALUE: " + icon);
            colorCode = "#000000";
    }
    return colorCode;
}