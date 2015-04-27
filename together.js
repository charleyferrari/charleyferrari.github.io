
var conceptMap = [
        {
          econ: "ValueAdd",
          econTitle: "Value Add",
          score: "DemandScore"
        },

        {
          econ: "Exports",
          econTitle: "Exports",
          score: "ExportScore"
        },

        {
          econ: "BusinessInvestment",
          econTitle: "Business Investment",
          score: "InvestmentScore"
        },

        {
          econ: "Employment",
          econTitle: "Total Employment",
          score: "EmploymentScore"
        },

        {
          econ: "AWETot",
          econTitle: "Average Weekly Earnings: Total",
          score: "TotalLabourCostsScore"
        },

        {
          econ: "AWEReg",
          econTitle: "Average Weekly Earnings: Regular Pay",
          score: "PayScore"
        },

        {
          econ: "GrossOperatingSurplus",
          econTitle: "Gross Operating Surplus",
          score: "PreTaxProfitsScore"
        }
        ];
var globalCurrentOrFuture = "Current";
var globalEconConcept = "ValueAdd";
var globalSector = "Total";
var globalDate = "7/1/2008";
var sectorList = ["Total", "Business and financial services", 
  "Distribution, hotels, catering, arts, entertainment, recreation and other services",
  "Production", "Transport, storage and communications"];

var dateList = ["1/1/2008", "4/1/2008", "7/1/2008", "10/1/2008",
                "1/1/2009", "4/1/2009", "7/1/2009", "10/1/2009",
                "1/1/2010", "4/1/2010", "7/1/2010", "10/1/2010",
                "1/1/2011", "4/1/2011", "7/1/2011", "10/1/2011",
                "1/1/2012", "4/1/2012", "7/1/2012", "10/1/2012"];


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

d3.select("#EconDropDown").append("select");

d3.select("#EconDropDown select")
  .selectAll("option")
  .data(conceptMap)
  .enter()
  .append("option")
  .text(function(d) { return d.econTitle; } )
  .attr("value", function(d) { return d.econ; } );

// d3.select("#EconDropDown select")
//   .on("change", function(){
//   })

var econChange = function(){
  globalEconConcept = d3.event.target.value;
  globalCVSConcept = cvsmap(globalEconConcept, conceptMap);
  drawEconGraph();

  if(d3.select("CurrentOrFutureDropDown select").empty()){
    d3.select("#CurrentOrFutureDropDown").append("select");
  }

  d3.select("#CurrentOrFutureDropDown select")
    .selectAll("option")
    .data(["Current", "Future"])
    .enter()
    .append("option")
    .text(function(d) { return d; } )
    .attr("value", function(d) { return d; } );

  var currentOrFutureChange = function(){
    globalCurrentOrFuture = d3.event.target.value;
    drawMeanCVSGraph();
  
    if(d3.select("#DateDropDown select").empty()){
      d3.select("#DateDropDown").append("select");
    }
    
    d3.select("#DateDropDown select")
      .selectAll("option")
      .data(dateList)
      .enter()
      .append("option")
      .text(function(d) { return d; } )
      .attr("value", function(d) { return d; } );

    var dateChange = function(){
      globalDate = d3.event.target.value;
      drawCVSHist();

      if(d3.select("#SectorDropDown select").empty()){
        d3.select("#SectorDropDown").append("select");  
      }

      d3.select("#SectorDropDown select")
        .selectAll("option")
        .data(sectorList)
        .enter()
        .append("option")
        .text(function(d) { return d; } )
        .attr("value", function(d) { return d; } );

      var sectorChange = function(){
        globalSector = d3.event.target.value;
        drawMeanCVSGraph();
        drawCVSHist();
      };

      d3.select("#SectorDropDown select")
        .on("change", sectorChange);
    };

    d3.select("#DateDropDown select")
      .on("change", dateChange);
  };

  d3.select("#CurrentOrFutureDropDown select")
    .on("change", currentOrFutureChange);

};

d3.select("#EconDropDown select")
  .on("change", econChange);



// function drawEconGraph(globalEconConcept, globalCurrentOrFuture, globalSector, globalDate){

function drawEconGraph(){

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
              .tickFormat(function(d) { return d3.time.format("%b %Y")(new Date(d)); });

          chart.yAxis
              .axisLabel("Average Company Visit Score")
              .tickFormat(d3.format(".02f"))
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

}

  /////////////////////////////////////////////////////////////////////////

function drawMeanCVSGraph(){

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
              .tickFormat(function(d) { return d3.time.format("%b %Y")(new Date(d)); });

          chart.yAxis
              .axisLabel("Average Company Visit Score")
              .tickFormat(d3.format(".02f"))
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

}

  /////////////////////////////////////////////////////////////////////////

function drawCVSHist(){

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
        }];
    }

    nv.addGraph(function() {

        var chart = nv.models.discreteBarChart()
            .x(function(d) { return d.label; })
            .y(function(d) { return d.value; })
            .staggerLabels(true)
            //.staggerLabels(historicalBarChart[0].values.length > 8)
            .tooltips(true)
            .showValues(false)
            .duration(250)
            ;

        chart.yAxis
          .axisLabel("Number of Company Visits")
          .tickFormat(function(d){ return Math.round(d); });  

        d3.select("#CVSHist svg")
            .datum(surveyData(globalSector,globalDate, globalCurrentOrFuture, globalCVSConcept))
            .call(chart);
        nv.utils.windowResize(function() { chart.update(); } );
        return chart;
    });

  });

}