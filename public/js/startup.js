var data;
var weatherData = [];
const rowWidth = 19;
const rowHeight = 20;
const squareWidth = 500/rowWidth;
const w = squareWidth * rowWidth;
const h = squareWidth * rowHeight;

var blue1 = "#667a86";
var teal1 = "#92b0a9";
var darkgreen1 = "#353708";
var green1 = "#9b9844";
var yellow1 = "#fdd57d";
var pink1 = "#d6a7b4";

var blueTally = 0;
var tealTally = 0;
var darkGreenTally = 0;
var greenTally = 0;
var yellowTally = 0;
var pinkTally = 0;

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
    //rect can't contain text so make g then add rect and text to
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
        .style("stroke-width", (d) => {
            if (d.day == "28-May-2018")
                return 10;
            if (d.day == "28-May-2019") console.log("SPECIAL");

            return 1;
        }) 
        .style("stroke", "black")
        .attr("fill", (d) => {
            returnColor = findColor(d.data.currently.icon);
            if (d.data.currently.windGust >= 10.00) returnColor = green1;
            if (returnColor == "#000000") returnColor = findColor(d.data.daily.data[0].icon);
            tally(returnColor);
            return returnColor;
            //return findColor(d.data.daily.data[0].icon);
        })
        .append("title")
        .text((d) => d.day);

    // Some label options made for a work reference for Abigail

    svg.selectAll("text")
        .data(weatherData)
        .enter()
        .append("text")
        .attr("x", (d, i) => {
            return (i % rowWidth) * squareWidth + 5;
        })
        .attr("y", (d, i) => {
            return (Math.floor(i / rowWidth) * squareWidth) + squareWidth / 2;
        })
        .text((d, i) => {
            // Day Label
            //returning d.day is too big 3-September-2019
            //var date = new Date(d.unixTime * 1000);
            //var month = date.getMonth() + 1;
            //var year = date.getFullYear() % 100;
            //var shortDate = month + "-" + date.getDate() + "-" + year;
            //return shortDate;
              
            return i + 1;
        });
    
        console.log("yellowTally: " + yellowTally);
        console.log("tealTally: " + tealTally);
        console.log("greenTally: " + greenTally);
        console.log("blueTally: " + blueTally);
        console.log("pinkTally: " + pinkTally);
        console.log("darkGreenTally: " + darkGreenTally);
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

function tally(color) {
    switch (color) {
        case "#667a86":
            ++blueTally;
            break;
        case "#92b0a9":
            ++tealTally;
            break;
        case "#353708":
            ++darkGreenTally;
            break;
        case "#9b9844":
            ++greenTally;
            break;
        case "#fdd57d":
            ++yellowTally;
            break;
        case "#d6a7b4":
            ++pinkTally;
            break;
    }
}