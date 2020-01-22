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
    left: 60,
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
    .classed("plot", true)
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
        .classed("xAxis", true)
        .attr("transform", `translate(0, ${plotHeight})`)
        .call(bottomAxis);
    
    chartGroup.append("g")
        .classed("xLabel", true)
        .append("text")
        .attr("transform", `translate(${svgWidth/2},${svgHeight - margin.bottom/2})`)
        .attr("font-weight", "bold")
        .text("In Poverty (%)")
    
    chartGroup.append("g")
        .classed("yLabel", true)
        .append("text")
        .attr("transform", `rotate(270), translate(${svgHeight/-2},${margin.left/-2})`)
        .attr("font-weight", "bold")
        .text("Lacks Healthcare (%)")
    
  
        

    chartGroup.append("g")
        .classed("yAxis", true)
        .call(leftAxis);
    
    var datapointsGroup = chartGroup.append("g")
        .classed("datapoints", true)

    datapointsGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 10)
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("fill", "teal")
        .attr("opacity", ".5");

    var datalabelsGroup = chartGroup.append("g")
        .classed("datalabels", true)
    
    datalabelsGroup.selectAll(null)
        .data(data)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .attr("transform", "translate(-5.5,4)")
        .attr("font-size", "9px")
        .attr("fill", "white")
        .text(d => d.abbr);
    


})