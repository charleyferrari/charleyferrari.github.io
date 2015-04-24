
var conceptMap = [
        {
          econ: "ValueAdd",
          score: "DemandScore"
        },

        {
          econ: "Exports",
          score: "ExportScore"
        },

        {
          econ: "BusinessInvestment",
          score: "InvestmentScore"
        },

        {
          econ: "Employment",
          score: "EmploymentScore"
        },

        {
          econ: "AWETot",
          score: "TotalLabourCostsScore"
        },

        {
          econ: "AWEReg",
          score: "PayScore"
        },

        {
          econ: "GrossOperatingSurplus",
          score: "PreTaxProfitsScore"
        }
        ];
var globalCurrentOrFuture = "Current";
var globalEconConcept = "ValueAdd";
var globalSector = "Total";
var globalDate = "7/1/2008";

function cvsmap(econ, conceptMap){
  var cvs;
  for(var i =0; i < conceptMap.length; i++){
    if(conceptMap[i].econ == econ){
      cvs = conceptMap[i].score;
    }
  }
  return cvs;
}
var globalCVSConcept = cvsmap(globalEconConcept, conceptMap);


d3.csv("econdata.csv", function(error, data){

    function econData(concept) {

        var parseDate = d3.time.format("%m/%d/%Y").parse;

        var econSeries = [];

        data.forEach(function(d){
            econSeries.push({
                x : parseDate(d.date), y : +d[concept]
            });
        });

        return [
            {
                key: concept,
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
            .datum(econData(globalEconConcept))
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

d3.csv("meancvs.csv", function(error, data){

    function meanCVSData(concept, sector, currentOrFuture) {

        var parseDate = d3.time.format("%m/%d/%Y").parse;

        var cvsSeries = [];

        data.forEach(function(d){
          if(d.Sector == sector && d.ScoreType == currentOrFuture){
              cvsSeries.push({
                  x : parseDate(d.date), y : +d[concept]
              });
          }
        });



        return [
            {
                key: concept,
                values: cvsSeries,
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



        d3.select("#CVSChart svg")
            .datum(meanCVSData(globalCVSConcept, globalSector, globalCurrentOrFuture))
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

d3.csv("agents.csv", function(error, data){

  function surveyData(sector, ActualDate, currentOrFuture, concept){
    // var parseDate = d3.time.format("%m/%d/%Y").parse;
    var surveyCounts = [0,0,0,0,0,0,0,0,0,0,0];

    // data.forEach(function(d){
    //   d.ActualDateDisplay = parseDate(d.ActualDateDisplay);
    // })

    data.forEach(function(d){
      if(sector == "Total"){
        if(d.ActualDateDisplay == ActualDate &&
            d.ScoreType == currentOrFuture){
          surveyCounts[+d[concept]+5] += 1;
        }
      } else {
        if(d.Sector == sector &&
            d.ActualDateDisplay == ActualDate &&
            d.ScoreType == currentOrFuture){
          surveyCounts[+d[concept]+5] += 1;
        }
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
          .datum(surveyData(globalSector,globalDate, globalCurrentOrFuture, globalCVSConcept))
          .call(chart);
      nv.utils.windowResize(function() { chart.update(); } );
      return chart;
  });

});