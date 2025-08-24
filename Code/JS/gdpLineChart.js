// set the dimensions and margins of the graph
const gdp_margin = {top: 10, right: 100, bottom: 30, left: 60},
gdp_width = window.innerWidth - gdp_margin.left - gdp_margin.right,
gdp_height = window.innerHeight/2 - gdp_margin.top - gdp_margin.bottom;

// append the svg object to the body of the page
const gdp_svg = d3.select("#my_gdpdataviz")
.append("svg")
.attr("width", gdp_width + gdp_margin.left + gdp_margin.right)
.attr("height", gdp_height + gdp_margin.top + gdp_margin.bottom)
.append("g")
.attr("transform", `translate(${gdp_margin.left},${gdp_margin.top})`);

gdpLineChart("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv","India");
function gdpLineChart(csv_path,selectedLocation){

gdp_svg.selectAll('path').remove();
gdp_svg.selectAll('g').remove();
gdp_svg.append('g').attr("transform", `translate(${gdp_margin.left}, ${gdp_margin.top})`);
//Read the data
d3.csv(csv_path,

// When reading the csv, I must format variables:
function(d){
return { date : d3.timeParse("%Y-%m-%d")(d.date), location : d.location, value1 : d.new_cases_smoothed_per_million ,
value2 : d.gdp_per_capita}
}).then(

// Now I can use this dataset:
function(data) {
gdpFilteredData = data.filter(d=>d.location==selectedLocation && d.value1!=0&& d.value2!=0)
// Add X axis --> it is a date format
const x = d3.scaleTime()
.domain(d3.extent(gdpFilteredData, function(d) { return d.date; }))
.range([ 0, gdp_width ]);
gdp_svg.append("g")
.attr("transform", `translate(0, ${gdp_height})`)
.call(d3.axisBottom(x).ticks(9));

// Add Y axis
const y0 = d3.scaleLinear()
.domain([0, d3.max(gdpFilteredData, function(d) { return +d.value1; })])
.range([ gdp_height, 0 ]);
gdp_svg.append("g")
.call(d3.axisLeft(y0).ticks(null, "s"));

//Add Y axis
 const y1 = d3.scaleLinear()
 .domain([0,d3.max(gdpFilteredData, function(d) { return +d.value2*2; })])
 .range([ gdp_height, 0 ]);
 gdp_svg.append("g")
 .call(d3.axisRight(y1).ticks(null, "s"));

// Add the line
gdp_svg.append("path")
.datum(gdpFilteredData)
.attr("fill", "none")
.attr("stroke", "#404080")
.attr("stroke-width", 4)
.attr("d", d3.line()
.x(function(d) { return x(d.date) })
.y(function(d) { return y0(d.value1) })
)

gdp_svg.append("path")
.datum(gdpFilteredData)
.attr("fill", "none")
.attr("stroke", "#69b3a2")
.attr("stroke-width", 4)
.attr("d", d3.line()
.x(function(d) { return x(d.date) })
.y(function(d) { return y1(d.value2) })
)
const gdp_legend = gdp_svg.append("g")
.attr("font-family", "sans-serif")
.attr("font-size", 12)
.attr("text-anchor", "end")
.selectAll("g")
.data(['new_cases_smoothed_per_million', 'gdp_per_capita'])
.join("g")
.attr("transform", (d, i) => `translate(0,${i * 20})`);

gdp_legend.append("rect")
.attr("x", gdp_width - 24)
.attr("width", 19)
.attr("height", 19)
.attr("fill", d => d === 'new_cases_smoothed_per_million' ? "#404080" : "#69b3a2");

gdp_legend.append("text")
.attr("x", gdp_width - 28)
.attr("y", 9.5)
.attr("dy", "0.32em")
.text(d => d);

// Add X axis label
gdp_svg.append("text")
.attr("class", "x-label")
.attr("text-anchor", "middle")
.attr("x", gdp_width / 2)
.attr("y", gdp_height - gdp_margin.bottom + 60)
.text("Date");

// Add Y axis label
gdp_svg.append("text")
.attr("class", "y-label")
.attr("text-anchor", "middle")
.attr("transform", "rotate(-90)")
.attr("x", -gdp_height / 2)
.attr("y", -gdp_margin.left+25)
.text("New Cases Smoothed per Million");

// Add Y1 axis label
gdp_svg.append("text")
.attr("class", "y1-label")
.attr("text-anchor", "middle")
.attr("transform", "rotate(-90)")
.attr("x", -gdp_height / 2)
.attr("y", gdp_width - gdp_margin.right + 30)
.text("GDP per Capita");
})}