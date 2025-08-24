
    // set the dimensions and margins of the graph
    const cb_margin = {top: 30, right: 120, bottom: 70, left: 60},
    cb_width = window.innerWidth - cb_margin.left - cb_margin.right,
    cb_height = window.innerHeight - cb_margin.top - cb_margin.bottom;
    
    // append the svg object to the body of the page
    const cb_svg = d3.select("#my_cbdataviz")
      .append("svg")
        .attr("width", cb_width + cb_margin.left + cb_margin.right)
        .attr("height", cb_height + cb_margin.top + cb_margin.bottom)
      .append("g")
        .attr("transform", `translate(${cb_margin.left}, ${cb_margin.top})`);
    
    clusteredBarChart("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv", "India");
    function clusteredBarChart(csv_file, cb_selectedLocation) {
      
    // Parse the Data
    d3.csv(csv_file).then ( function(data) {
    
        const locationFilter = ['India','Qatar','United Kingdom','United States','Norway']
        const filteredData = data.filter(function(d){return locationFilter.includes(d.location)})
      // sort data
      filteredData.sort(function(b, a) {
        return a.gdp_per_capita - b.gdp_per_capita;
      });
    
      // X axis
      const x0 = d3.scaleBand()
        .range([ 0, cb_width ])
        .domain(filteredData.map(d => d.location))
        .padding(0.2);
      
      const x1 = d3.scaleBand()
        .domain(['gdp_per_capita', 'new_cases_smoothed'])
        .range([0, x0.bandwidth()])
        .padding(0.05);
      
      cb_svg.append("g")
        .attr("transform", `translate(0, ${cb_height})`)
        .call(d3.axisBottom(x0))
        .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");
    
      // Add Y axis for GDP per capita
      const y0 = d3.scaleLinear()
        .domain([0, d3.max(filteredData, function(d) { return +d.gdp_per_capita; })])
        .range([ cb_height, 0]);
      cb_svg.append("g")
        .call(d3.axisLeft(y0).ticks(null, "s"))
        .append("text")
          .attr("y", 6)
          .attr("dy", "-2em")
          .attr("x", -60)
          .attr("text-anchor", "start")
          .attr("font-size", "12px")
          .attr("fill", "black")
          .text("GDP per capita (USD)");
    
      // Add Y axis for population density
      const y1 = d3.scaleLinear()
        .domain([0, d3.max(filteredData, function(d) { return +d.new_cases_smoothed; })])
        .range([ cb_height, 0]);
      cb_svg.append("g")
        .attr("transform", `translate(${cb_width}, 0)`)
        .call(d3.axisRight(y1).ticks(null, "s"))
        .append("text")
          .attr("y", 6)
          .attr("dy", "-2em")
         
        // Add the bars
        cb_svg.append("g")
        .selectAll("g")
        .data(filteredData)
        .join("g")
        .attr("transform", d => `translate(${x0(d.location)}, 0)`)
        .selectAll("rect")
        .data(d => [{key: 'gdp_per_capita', value: d.gdp_per_capita}, {key: 'new_cases_smoothed', value: d.new_cases_smoothed}])
        .join("rect")
        .attr("x", d => x1(d.key))
        .attr("y", d => d.key === 'gdp_per_capita' ? y0(d.value) : y1(d.value))
        .attr("width", x1.bandwidth())
        .attr("height", d => cb_height - (d.key === 'gdp_per_capita' ? y0(d.value) : y1(d.value)))
        .attr("fill", d => d.key === 'gdp_per_capita' ? "#69b3a2" : "#404080");

        function update(selectedGroups) {

          
  
          }

        // Add the legend
        const cb_legend = cb_svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(['GDP per capita', 'new_cases_smoothed'])
            .join("g")
            .attr("transform", (d, i) => `translate(0,${i * 20})`);
        
        cb_legend.append("rect")
            .attr("x", cb_width - 24)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", d => d === 'GDP per capita' ? "#69b3a2" : "#404080");

        cb_legend.append("text")
            .attr("x", cb_width - 28)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(d => d);

})
};