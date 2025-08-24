// set the dimensions and margins of the graph
const ac_margin = {top: 20, right: 100, bottom: 60, left: 60},
      ac_width = window.innerWidth -ac_margin.left -ac_margin.right,
      ac_height = window.innerHeight -ac_margin.top -ac_margin.bottom;

// append the svg object to the body of the page
const ac_svg = d3.select("#my_areadataviz")
  .append("svg")
    .attr("width", ac_width +ac_margin.left +ac_margin.right)
    .attr("height", ac_height +ac_margin.top +ac_margin.bottom)
  .append("g")
    .attr("transform",`translate(${ac_margin.left},${ac_margin.top})`);
    
    stringencyAreaChart("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv","India");
    function stringencyAreaChart(ac_csv_file, ac_selectedLocation) {
      //Read the data
      
      ac_svg.selectAll('g').remove();
      ac_svg.append('g').attr("transform", `translate(${ac_margin.left}, ${ac_margin.top})`);
      d3.csv(ac_csv_file,

      // When reading the csv, I must format variables:
      d => {
        return { date : d3.timeParse("%Y-%m-%d")(d.date),location: d.location, value : d.stringency_index }
      }).then(

      // Now I can use this dataset:
      function(data) {
        ac_FilteredData = data.filter(d=>d.location==ac_selectedLocation && d.value!=0)
        // Add X axis --> it is a date format
        const x = d3.scaleTime()
          .domain(d3.extent(ac_FilteredData, d => d.date))
          .range([ 0, ac_width ]);
        xAxis = ac_svg.append("g")
          .attr("transform", `translate(0,${ac_height})`)
          .call(d3.axisBottom(x).ticks(9))
          .append("text")
          .attr("y", 60)
          .attr("dy", "-2em")
          .attr("x", 720)
          .attr("text-anchor", "start")
          .attr("font-size", "12px")
          .attr("fill", "black")
          .text("Time");

        // Add Y axis
        const y = d3.scaleLinear()
          .domain([0, 100])
          .range([ ac_height, 0 ]);
        yAxis = ac_svg.append("g")
          .call(d3.axisLeft(y))
          .append("text")
            .attr("y", 6)
            .attr("dy", "-2em")
            .attr("x", -360)
            .attr("text-anchor", "start")
            .attr("font-size", "12px")
            .attr("fill", "black")
            .text("Stringency Index")
            .attr("transform", "translate(-10,0)rotate(-90)");

        // Add a clipPath: everything out of this area won't be drawn.
        const clip = ac_svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", ac_width )
            .attr("height", ac_height )
            .attr("x", 0)
            .attr("y", 0);

        // Add brushing
        const brush = d3.brushX()                   // Add the brush feature using the d3.brush function
            .extent( [ [0,0], [ac_width,ac_height] ] )  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
            .on("end", updateChart)               // Each time the brush selection changes, trigger the 'updateChart' function

        // Create the area variable: where both the area and the brush take place
        const area = ac_svg.append('g')
          .attr("clip-path", "url(#clip)")

        // Create an area generator
        const areaGenerator = d3.area()
          .x(d => x(d.date))
          .y0(y(0))
          .y1(d => y(d.value))

        // Add the area
        area.append("path")
          .datum(ac_FilteredData)
          .attr("class", "myArea")  // I add the class myArea to be able to modify it later on.
          .attr("fill", "#404080")
          .attr("fill-opacity", .3)
          .attr("stroke", "black")
          .attr("stroke-width", 1)
          .attr("d", areaGenerator )

        // Add the brushing
        area
          .append("g")
            .attr("class", "brush")
            .call(brush);

        // A function that set idleTimeOut to null
        let idleTimeout
        function idled() { idleTimeout = null; }

        // A function that update the chart for given boundaries
        function updateChart(event) {

          // What are the selected boundaries?
          extent = event.selection

          // If no selection, back to initial coordinate. Otherwise, update X axis domain
          if(!extent){
            if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
            x.domain([ 4,8])
          }else{
            x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
            area.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
          }

          // Update axis and area position
          xAxis.transition().duration(1000).call(d3.axisBottom(x))
          area
              .select('.myArea')
              .transition()
              .duration(1000)
              .attr("d", areaGenerator)
        }

        // If user double click, reinitialize the chart
        ac_svg.on("dblclick",function(){
          x.domain(d3.extent(ac_FilteredData, d => d.date))
          xAxis.transition().call(d3.axisBottom(x))
          area
            .select('.myArea')
            .transition()
            .attr("d", areaGenerator)
        });

      })
    }
