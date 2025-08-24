
const csv_loc = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv";
//// set the dimensions and margins of the graph
const mp_margin = {top: 30, right: 30, bottom: 70, left: 60},
mp_width = window.innerWidth - mp_margin.left - mp_margin.right,
mp_height = window.innerHeight - mp_margin.top - mp_margin.bottom;

// append the svg object to the body of the page
const mp_svg = d3.select("#my_dataviz")
.append("svg")
.attr("width", mp_width + mp_margin.left + mp_margin.right)
.attr("height", mp_height + mp_margin.top + mp_margin.bottom)
.append("g")
.attr("transform", `translate(${mp_margin.left}, ${mp_margin.top})`);
// Map and projection
const mp_path = d3.geoPath();
const mp_projection = d3.geoMercator()
  .scale(150)
  .center([0,20])
  .translate([mp_width / 2, mp_height / 2]);

// Data and color scale
const mp_data = new Map();
const mp_colorScale = d3.scaleThreshold()
  .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
  .range(d3.schemeBlues[7]);

// Load external data and boot
Promise.all([
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
d3.csv(csv_loc, function(d) {
    mp_data.set(d.iso_code, +d.total_cases)
})]).then(function(loadData){
    let topo = loadData[0]

    let mouseOver = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .5)
    d3.select(this)
      .transition()
      .duration(200)
      .style("opacity", 1)
      .style("stroke", "black")
  }

  let mouseLeave = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .8)
    d3.select(this)
      .transition()
      .duration(200)
      .style("stroke", "transparent")
  }

  
  let onClick = function(d){
    d3.selectAll(".Country")
    .transition()
    .duration(200)
    .style("opacity", .5)
    d3.select(this)
    .transition()
    .duration(200)
    .style("opacity", 1)
    .style("stroke", "black");
    const filteredLocation = d3.select(this).attr("id");
    console.log(filteredLocation);
    stringencyAreaChart(csv_loc, filteredLocation);
  }
  

  // Draw the map
  mp_svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(mp_projection)
      )
      .attr("id", function(d){ return d.properties.name; })
      // set the color of each country
      .attr("fill", function (d) {
        d.total = mp_data.get(d.properties.name) || 0;
        return mp_colorScale(d.total);
      })
      .style("stroke", "transparent")
      .attr("class", function(d){ return "Country" } )
      .style("opacity", .8)
      .on("mouseover", mouseOver )
      .on("mouseleave", mouseLeave )
      .on("click",onClick)

})