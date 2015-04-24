d3.csv("d3econdata.csv", function(error, data){

    function econData() {

        var parseDate = d3.time.format("%Y-%m-%d").parse;

        var econSeries = [];

        data.forEach(function(d){
            econSeries.push({
                x : parseDate(d.date), y : +d.MeanCVS
            });
        });

        return [
            {
                key: "Econ Series",
                values: econSeries,
                color: "#0000ff"
            }];

    }

    nv.addGraph(function() {
        var chart = nv.models.lineChart()
            .useInteractiveGuideline(true);

        chart.xAxis
            .axisLabel("Date")
            .tickFormat(function(d) { return d3.time.format('%b %Y')(new Date(d)); });

        chart.yAxis
            .axisLabel("Average Company Visit Score")
            .tickFormat(d3.format('.02f'))
            ;



        d3.select("#EconChart svg")
            .datum(econData())
            .transition().duration(500).call(chart);

        nv.utils.windowResize(
                function() {
                    chart.update();
                }
            );

        return chart;
    });

});

/////////////////////////////////////////////////////////////////////////

d3.csv("agentdataprop.csv", function(error, data){

  function surveyData(sector, ActualDate){
    // var parseDate = d3.time.format("%m/%d/%Y").parse;
    var surveyCounts = [0,0,0,0,0,0,0,0,0,0,0];

    // data.forEach(function(d){
    //   d.ActualDateDisplay = parseDate(d.ActualDateDisplay);
    // })

    data.forEach(function(d){
      if(d.Sector == sector &&
          d.ActualDateDisplay == ActualDate){
        surveyCounts[+d.DemandScore+5] += 1;
      }
    });

    var returnData = [];

    surveyCounts.forEach(function(d, i){
      returnData.push({
        label: String(i-5),
        value: +surveyCounts[i]
      });
    });

    return [
      {
        key: "Company Visit Scores",
        values: returnData
      }]
  }

  nv.addGraph(function() {

      var chart = nv.models.discreteBarChart()
          .x(function(d) { return d.label })
          .y(function(d) { return d.value })
          .staggerLabels(true)
          //.staggerLabels(historicalBarChart[0].values.length > 8)
          .tooltips(true)
          .showValues(false)
          .duration(250)
          ;

      chart.yAxis
        .axisLabel("Number of Company Visits")
        .tickFormat(function(d){ return Math.round(d); });  

      d3.select('#CVSHist svg')
          .datum(surveyData("Business and financial services","7/1/2008"))
          .call(chart);
      nv.utils.windowResize(function() { chart.update(); } );
      return chart;
  });

});