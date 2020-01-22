// D3 Challenge by Gerard Tieng


// ****************
// *   PRE-WORK   *
// ****************


// Step 1: Set image dimensions

//1a: canvas dimensions
var svgWidth = 800; 
var svgHeight = 500;

//1b: margins
var margin = {
    top: 20,
    bottom: 50,
    left: 20,
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


// Step 1: Load data

// Step 1a: use d3.csv; write code within master function.
d3.csv("assets/data/data.csv").then(function(data) {
    console.log(data);    

    // Step 1b: convert values from strings to integer
    data.forEach(function(d) {
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
    });

    // Step 2: Create the axes

    // Step 2a: Set the scales for X & Y
    var xLinearScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.poverty))
        .range([0, plotWidth]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.healthcare)])
        .range([plotHeight, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    
    // Step 2b: Insert the axes into the SVG
    chartGroup.append("g")
        .attr("transform", `translate(0, ${plotHeight})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare));

})