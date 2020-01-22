// D3 Challenge by Gerard Tieng


// ****************
// *   PRE-WORK   *
// ****************


// Step 1: Set image dimensions

//1a: canvas dimensions
var svgWidth = 1200; 
var svgHeight = 600;

//1b: margins
var margin = {
    top: 20,
    bottom: 20,
    left: 50,
    right: 50
};

//1c: drawing dimensions
var plotWidth = svgWidth - (margin.left + margin.right);
var plotHeight = svgHeight - (margin.top + margin.bottom);


// Step 2: Insert the SVG into the HTML

// 2a: Insert SVG
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

// 2b: Insert G
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// ******************    
// * READY TO DRAW! *
// ******************


// Step 1: Load in CSV data; write code within master function.
d3.csv("assets/data/data.csv").then(function(data) {
    console.log(data);

    // Step 2: Set axis scales
    var xLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.poverty)])
        .range([0, plotWidth]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.healthcare)])
        .range([plotHeight, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    
    chartGroup.append("g")
        .attr("transform", `translate(0, ${plotHeight})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

})