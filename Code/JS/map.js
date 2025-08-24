const dateInput = document.getElementById("date-input");
var selectedDate = "";
dateInput.addEventListener("change", function() {
// Get the selected date value
selectedDate = dateInput.value;

// Log the selected date to the console for testing
console.log(selectedDate);

// Call a function to update the visualization based on the selected date
updateVisualization(selectedDate);
});
const csv_loc = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv";
//// set the dimensions and margins of the graph
const mp_margin = {top: 30, right: 60, bottom: 70, left: 60},
mp_width = window.innerWidth - mp_margin.left - mp_margin.right,
mp_height = window.innerHeight - mp_margin.top - mp_margin.bottom;

// append the svg object to the body of the page
const mp_svg = d3.select("#my_mapdataviz")
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
  .domain([10000, 500000, 1000000, 5000000, 10000000, 50000000])
  .range(d3.schemeBlues[7]);

  function updateVisualization(selectedDate){
// Load external data and boot
Promise.all([
  d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
  d3.csv(csv_loc, function (d) {
  // Filter the data for the last date
  if (d.date === selectedDate) {
  mp_data.set(d.iso_code, +d.total_cases)
  }
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
    .style("stroke", "black")
    // .html("<a href="#my_areadataviz"></a>");
    const filteredLocation = d3.select(this).attr("id");
    console.log(filteredLocation);
    stringencyAreaChart(csv_loc, filteredLocation);
    multiVaccLineChart(csv_loc,filteredLocation);
    multiCasesChart(csv_loc,filteredLocation);
    gdpLineChart(csv_loc,filteredLocation);
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
        d.total = mp_data.get(d.id) || 0;
        return mp_colorScale(d.total);
      })
      .style("stroke", "transparent")
      .attr("class", function(d){ return "Country" } )
      .style("opacity", .8)
      .on("mouseover", mouseOver )
      .on("mouseleave", mouseLeave )
      .on("click",onClick).append("title") // Add a title element to display the country's name
      .text(function(d) { return d.id +" : "+ d.total;});

      // create a new svg element for the legend
      const legend_svg = mp_svg.append("svg")
      .attr("class", "legend")
      .attr("width", mp_width / 4)
      .attr("height", mp_height / 4);

      // create a g element for the legend and translate it
      const legend = legend_svg.append("g")
      .attr("transform", `translate(10,10)`);

      // create an array of domain values for the color scale
      const domain = mp_colorScale.domain();

      // create a set of rectangles to represent the color scale
      legend.selectAll("rect")
      .data(domain)
      .enter()
      .append("rect")
        .attr("x", 0)
        .attr("y", function(d, i) { return i * 25; })
        .attr("width", 20)
        .attr("height", 20)
        .style("fill", function(d) { return mp_colorScale(d); });

      // add text labels to the legend
      legend.selectAll("text")
      .data(domain)
      .enter()
      .append("text")
        .attr("x", 30)
        .attr("y", function(d, i) { return i * 25 + 15; })
        .text(function(d) { return d.toLocaleString(); });
      
        let mp_mouseOver = function(d) {
          const country = d.properties.name;
          const cases = mp_data.get(d.id) || 0;
          
          // create a tooltip div
          d3.select("body").append("div")
              .attr("class", "tooltip")
              .style("opacity", 0)
              .html(`<strong>${country}</strong><br>Total Cases: ${cases.toLocaleString()}`);
      
          // show the tooltip and move it with the mouse
          d3.select(".mp_tooltip")
              .transition()
              .duration(200)
              .style("opacity", .9)
              .style("left", (d3.event.pageX + 10) + "px")
              .style("top", (d3.event.pageY - 28) + "px");
      }
      
      let mp_mouseLeave = function(d) {
          // hide the tooltip
          d3.select(".mp_tooltip")
              .transition()
              .duration(200)
              .style("opacity", 0)
              .remove();
      }      
        

})}
updateVisualization();