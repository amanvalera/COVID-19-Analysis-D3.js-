// set the dimensions and margins of the graph
const mclc_margin = {top: 10, right: 100, bottom: 30, left: 60},
    mclc_width = window.innerWidth - mclc_margin.left - mclc_margin.right,
    mclc_height = window.innerHeight/2 - mclc_margin.top - mclc_margin.bottom;

// append the svg object to the body of the page
const mclc_svg = d3.select("#my_mclcdataviz")
  .append("svg")
    .attr("width", mclc_width + mclc_margin.left + mclc_margin.right)
    .attr("height", mclc_height + mclc_margin.top + mclc_margin.bottom)
  .append("g")
    .attr("transform", `translate(${mclc_margin.left},${mclc_margin.top})`);

    multiCasesChart("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv","India");
function multiCasesChart(csv_path,selectedLocation){
  
  mclc_svg.selectAll('path').remove();
  mclc_svg.selectAll('g').remove();
  mclc_svg.append('g').attr("transform", `translate(${mclc_margin.left}, ${mclc_margin.top})`);
//Read the data
d3.csv(csv_path,

  // When reading the csv, I must format variables:
  function(d){
    return { date : d3.timeParse("%Y-%m-%d")(d.date), location : d.location, value1 : d.new_cases_smoothed_per_million , value2 : d.new_deaths_smoothed_per_million, value3 : d.new_vaccinations_smoothed_per_million}
  }).then(
	
  // Now I can use this dataset:
  function(data) {
    casesFilteredData = data.filter(d=>d.location==selectedLocation && d.value1!=0&& d.value2!=0&& d.value3!=0)
    // Add X axis --> it is a date format
    const x = d3.scaleTime()
      .domain(d3.extent(casesFilteredData, function(d) { return d.date; }))
      .range([ 0, mclc_width ]);
    mclc_svg.append("g")
      .attr("transform", `translate(0, ${mclc_height})`)
      .call(d3.axisBottom(x).ticks(9));

    // Add Y axis
    const y0 = d3.scaleLinear()
      .domain([0, d3.max(casesFilteredData, function(d) { return +d.value3; })])
      .range([ mclc_height, 0 ]);
    mclc_svg.append("g")
      .call(d3.axisLeft(y0).ticks(null, "s"));

    // Add Y axis
    // const y1 = d3.scaleLinear()
    //   .domain([0,100])
    //   .range([ mclc_height, 0 ]);
    // mclc_svg.append("g")
    //   .call(d3.axisRight(y1).ticks(null, "s"));

    // Add the line
    mclc_svg.append("path")
      .datum(casesFilteredData)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 4)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y0(d.value1) })
        )
    mclc_svg.append("path")
      .datum(casesFilteredData)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 4)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y0(d.value2*1000) })
        )
    mclc_svg.append("path")
        .datum(casesFilteredData)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 4)
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y0(d.value3) })
          )
    const c_legend = mclc_svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(['new_cases_smoothed_per_million', 'new_deaths_smoothed_per_hundred','new_vaccinations_smoothed_per_million'])
            .join("g")
            .attr("transform", (d, i) => `translate(0,${i * 20})`);
        
    c_legend.append("rect")
            .attr("x", mclc_width - 24)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", d => d === 'new_cases_smoothed_per_million' ? "blue" : d === 'new_deaths_smoothed_per_hundred' ? "red" : "green");

    c_legend.append("text")
            .attr("x", mclc_width - 28)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(d => d);

            // Add X-axis label
mclc_svg.append("text")
.attr("class", "x label")
.attr("text-anchor", "end")
.attr("x", mclc_width/2)
.attr("y", mclc_height + mclc_margin.top + 20)
.text("Date");

// Add Y-axis label for the left axis
mclc_svg.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("y", -mclc_margin.left)
  .attr("x", -mclc_height/2 + 150)
  .attr("dy", ".75em")
  .attr("transform", "rotate(-90)")
  .text("New cases, deaths and vaccinations per million");

// Add Y-axis label for the right axis
mclc_svg.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("y", mclc_width - mclc_margin.right+100)
  .attr("x", -mclc_height/2)
  .attr("dy", ".75em")
  .attr("transform", "rotate(-90)")
  .text("New deaths per thousand");

})}