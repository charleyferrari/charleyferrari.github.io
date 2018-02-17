
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

var dateList = ["1/1/2008", "4/1/2008", "7/1/2008", "10/1/2008",
                "1/1/2009", "4/1/2009", "7/1/2009", "10/1/2009",
                "1/1/2010", "4/1/2010", "7/1/2010", "10/1/2010",
                "1/1/2011", "4/1/2011", "7/1/2011", "10/1/2011",
                "1/1/2012", "4/1/2012", "7/1/2012", "10/1/2012"];

var dataTest = {};

dateList.forEach(function(d){
  dataTest[d] = {
    surveyCount: [0,0,0,0,0,0,0,0,0,0,0],
    meanTally: [0,0,0,0,0,0,0,0,0,0,0]
  };
});

var globalConcept = "DemandScore";
var globalConcept2 = "EmploymentScore";
var globalSector = "Total";
var globalCurrentOrFuture = "Current";

google.load("visualization", "1", {packages:["motionchart"]});
google.setOnLoadCallback(drawChart);
function drawChart() {
  d3.csv("agents.csv", function(error, data){
    function googleSurveyData(sector, currentOrFuture, concept1, concept2){

      function increment(item){
        var concept1Score = +item[concept1];
        var concept2Score = +item[concept2];
        var currentMean = dataTest[item.ActualDateDisplay].meanTally[concept1Score+5];
        var currentCount = dataTest[item.ActualDateDisplay].surveyCount[concept1Score+5];

        if(currentMean === 0){
          dataTest[item.ActualDateDisplay].meanTally[+item[concept1]+5] = concept2Score;
        } else{
          dataTest[item.ActualDateDisplay].meanTally[+item[concept1]+5] = 
            (currentMean * currentCount + concept2Score) / (currentCount + 1);
        }

        dataTest[item.ActualDateDisplay].surveyCount[+item[concept1]+5] += 1;
      }
      
      data.forEach(function(d){
        if(sector == "Total"){
          if(d.ScoreType == currentOrFuture){
            increment(d);
          }
        } else{
          if(d.ScoreType == currentOrFuture && d.Sector == sector){
            increment(d);
          }
        }

      });

    }

    googleSurveyData(globalSector, globalCurrentOrFuture, globalConcept, globalConcept2);

    var dataForGoogle = [];

    var parseDate = d3.time.format("%m/%d/%Y").parse;

    dateList.forEach(function(d){
      for(var i=0; i<dataTest[d].surveyCount.length; i++){
        dataForGoogle.push([
          String(i-5), parseDate(d), i-5,  dataTest[d].meanTally[i], "Color", dataTest[d].surveyCount[i]
        ]);
      }
    });

    var data = new google.visualization.DataTable();
    data.addColumn('string', globalConcept);
    data.addColumn('date', 'Date');
    data.addColumn('number', globalConcept);
    data.addColumn('number', globalConcept2);
    data.addColumn('string', 'ColorPlaceHolder');
    data.addColumn('number', 'SurveyCount');
    data.addRows(dataForGoogle);
    var chart = new google.visualization.MotionChart(document.getElementById('chart_div'));
    chart.draw(data, {width: 600, height:300});

  });  

}

d3.select("#dropDown").append("select");

d3.select("#dropDown select")
  .selectAll("option")
  .data(conceptMap)
  .enter()
  .append("option")
  .text(function(d) { return d.econTitle; } )
  .attr("value", function(d) { return d.score; } );

d3.select("#dropDown select")
  .on("change", function(){
    globalConcept = d3.event.target.value;
    google.load("visualization", "1", {packages:["motionchart"]});
    google.setOnLoadCallback(drawChart);
  });
