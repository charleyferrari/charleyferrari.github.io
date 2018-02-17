
    // historicalBarChart = [
    //     {
    //         key: "Cumulative Return",
    //         values: [
    //             {
    //                 "label" : "A" ,
    //                 "value" : 29.765957771107
    //             } ,
    //             {
    //                 "label" : "B" ,
    //                 "value" : 0
    //             } ,
    //             {
    //                 "label" : "C" ,
    //                 "value" : 32.807804682612
    //             } ,
    //             {
    //                 "label" : "D" ,
    //                 "value" : 196.45946739256
    //             } ,
    //             {
    //                 "label" : "E" ,
    //                 "value" : 0.19434030906893
    //             } ,
    //             {
    //                 "label" : "F" ,
    //                 "value" : 98.079782601442
    //             } ,
    //             {
    //                 "label" : "G" ,
    //                 "value" : 13.925743130903
    //             } ,
    //             {
    //                 "label" : "H" ,
    //                 "value" : 5.1387322875705
    //             }
    //         ]
    //     }
    // ];
    // nv.addGraph(function() {
    //     var chart = nv.models.discreteBarChart()
    //         .x(function(d) { return d.label })
    //         .y(function(d) { return d.value })
    //         .staggerLabels(true)
    //         //.staggerLabels(historicalBarChart[0].values.length > 8)
    //         .tooltips(false)
    //         .showValues(true)
    //         .duration(250)
    //         ;
    //     d3.select('#chart1 svg')
    //         .datum(historicalBarChart)
    //         .call(chart);
    //     nv.utils.windowResize(chart.update);
    //     return chart;
    // });

d3.csv("agentdataprop1d.csv", function(error, data){

  function surveyData(){
    // var parseDate = d3.time.format("%m-%d-%Y").parse;
    var surveyCounts = [0,0,0,0,0,0,0,0,0,0,0];

    data.forEach(function(d){
      if(d.Sector == "Business and financial services"){
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
      d3.select('#chart1 svg')
          .datum(surveyData())
          .call(chart);
      nv.utils.windowResize(chart.update);
      return chart;
  });

});
