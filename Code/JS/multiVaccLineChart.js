// set the dimensions and margins of the graph
const mvlc_margin = {top: 10, right: 100, bottom: 30, left: 60},
    mvlc_width = window.innerWidth - mvlc_margin.left - mvlc_margin.right,
    mvlc_height = window.innerHeight/2 - mvlc_margin.top - mvlc_margin.bottom;

// append the svg object to the body of the page
const mvlc_svg = d3.select("#my_mvlcdataviz")
  .append("svg")
    .attr("width", mvlc_width + mvlc_margin.left + mvlc_margin.right)
    .attr("height", mvlc_height + mvlc_margin.top + mvlc_margin.bottom)
  .append("g")
    .attr("transform", `translate(${mvlc_margin.left},${mvlc_margin.top})`);

    multiVaccLineChart("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv","India");
function multiVaccLineChart(csv_path,mvlc_selectedLocation){
  
  mvlc_svg.selectAll('path').remove();
  mvlc_svg.selectAll("g").remove();
  mvlc_svg.append('g').attr("transform", `translate(${mvlc_margin.left}, ${mvlc_margin.top})`);
//Read the data
d3.csv(csv_path,

  // When reading the csv, I must format variables:
  function(d){
    return { date : d3.timeParse("%Y-%m-%d")(d.date), location : d.location, value1 : d.people_vaccinated_per_hundred , value2 : d.people_fully_vaccinated_per_hundred, value3 : d.total_boosters_per_hundred}
  }).then(
	
  // Now I can use this dataset:
  function(data) {
    vaccineFilteredData = data.filter(d=>d.location==mvlc_selectedLocation && d.value1!=0&& d.value2!=0&& d.value3!=0)
    // Add X axis --> it is a date format
    const x = d3.scaleTime()
      .domain(d3.extent(vaccineFilteredData, function(d) { return d.date; }))
      .range([ 0, mvlc_width ]);
    mvlc_svg.append("g")
      .attr("transform", `translate(0, ${mvlc_height})`)
      .call(d3.axisBottom(x).ticks(9));

    // Add Y axis
    const y0 = d3.scaleLinear()
      .domain([0, 100])
      .range([ mvlc_height, 0 ]);
    mvlc_svg.append("g")
      .call(d3.axisLeft(y0).ticks(null, "s"));

    // Add Y axis
    // const y1 = d3.scaleLinear()
    //   .domain([0,100])
    //   .range([ mvlc_height, 0 ]);
    // mvlc_svg.append("g")
    //   .call(d3.axisRight(y1).ticks(null, "s"));

    // Add the line
    mvlc_svg.append("path")
      .datum(vaccineFilteredData)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 4)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y0(d.value1) })
        )
    mvlc_svg.append("path")
        .datum(vaccineFilteredData)
        .attr("fill", "none")
        .attr("stroke", "#404080")
        .attr("stroke-width", 4)
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y0(d.value2) })
          )
      mvlc_svg.append("path")
          .datum(vaccineFilteredData)
          .attr("fill", "none")
          .attr("stroke", "red")
          .attr("stroke-width", 4)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y0(d.value3) })
            )
    const v_legend = mvlc_svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(['people_vaccinated_per_hundred', 'people_fully_vaccinated_per_hundred','total_boosters_per_hundred'])
            .join("g")
            .attr("transform", (d, i) => `translate(0,${i * 20})`);
        
    v_legend.append("rect")
            .attr("x", mvlc_width - 24)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", d => d === 'people_vaccinated_per_hundred' ? "#69b3a2" : d === 'people_fully_vaccinated_per_hundred' ? "#404080" : "red");

    v_legend.append("text")
            .attr("x", mvlc_width - 28)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(d => d);
            // Add X-axis label
mvlc_svg.append("text")
.attr("class", "x label")
.attr("text-anchor", "end")
.attr("x", mvlc_width/2)
.attr("y", mvlc_height + mvlc_margin.top + 20)
.text("Date");

// Add Y-axis label for the left axis
mvlc_svg.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("y", -mvlc_margin.left)
  .attr("x", -mvlc_height/2 + 150)
  .attr("dy", ".75em")
  .attr("transform", "rotate(-90)")
  .text("People vaccinated and fully vaccinated per hundered");

// Add Y-axis label for the right axis
mvlc_svg.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("y", mvlc_width - mvlc_margin.right+100)
  .attr("x", -mvlc_height/2)
  .attr("dy", ".75em")
  .attr("transform", "rotate(-90)")
  .text("Total boosters per hundered");
})}
