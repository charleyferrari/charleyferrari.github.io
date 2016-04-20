Plotly.d3.csv('https://media.githubusercontent.com/media/charleyferrari/charleyferrari.github.io/master/plotly/bankofengland/agents.csv', function(err, agentsdata){
  Plotly.d3.csv('https://media.githubusercontent.com/media/charleyferrari/charleyferrari.github.io/master/plotly/bankofengland/meancvs.csv', function(err, meancvsdata){
    Plotly.d3.csv('https://media.githubusercontent.com/media/charleyferrari/charleyferrari.github.io/master/plotly/bankofengland/econdata.csv', function(err, econdata){

      var conceptList = ['ValueAdd','Exports','BusinessInvestment','GrossOperatingSurplus','Employment','AWEReg','AWETot'],
          globalConcept = 'ValueAdd',
          globalCurrentOrFuture = 'Current',
          globalSector = 'Total',
          globalScore = 'DemandScore',
          globalDate = 'Q1-2008',
          globalSecondScore = 'ExportScore',
          barcount = [0,0,0,0,0,0,0,0,0,0,0],
          meanbubblecount = [0,0,0,0,0,0,0,0,0,0,0],
          bubblesizecount = [0,0,0,0,0,0,0,0,0,0,0],
          meanbubblecounter = 0,
          globaleconTitle, globalscoreTitle,
          dateList = ["Q1-2008", "Q2-2008", "Q3-2008", "Q4-2008",
                      "Q1-2009", "Q2-2009", "Q3-2009", "Q4-2009",
                      "Q1-2010", "Q2-2010", "Q3-2010", "Q4-2010",
                      "Q1-2011", "Q2-2011", "Q3-2011", "Q4-2011",
                      "Q1-2012", "Q2-2012", "Q3-2012", "Q4-2012",
                      "Q1-2013", "Q2-2013", "Q3-2013", "Q4-2013"],
          sectorList = ["Total", "Production",
          "Distribution, hotels, catering, arts, entertainment, recreation and other services",
          "Business and financial services", "Transport, storage and communications"];

      /*
      var fulldateList = [],
          fullsectorList = ['Total'];



      agentsdata.forEach(function(d){
        fulldateList.push(d.ActualDateDisplay);
        fullsectorList.push(d.Sector);
      })

      d3.set(["foo", "bar", "foo", "baz"]).values()

      var dateList = d3.set(fulldateList).values();
      var sectorList = d3.set(fullsectorList).values();

      console.log(dateList);
      console.log(sectorList);*/

      var conceptMap = [
              {
                econ: "ValueAdd",
                econTitle: "Value Add",
                score: "DemandScore",
                scoreTitle: "Demand Score"
              },

              {
                econ: "Exports",
                econTitle: "Exports",
                score: "ExportScore",
                scoreTitle: "Export Score"
              },

              {
                econ: "BusinessInvestment",
                econTitle: "Business Investment",
                score: "InvestmentScore",
                scoreTitle: "Investment Score"
              },

              {
                econ: "Employment",
                econTitle: "Total Employment",
                score: "EmploymentScore",
                scoreTitle: "Employment Score"
              },

              {
                econ: "AWETot",
                econTitle: "Average Weekly Earnings: Total",
                score: "TotalLabourCostsScore",
                scoreTitle: "Total Labour Costs Score"
              },

              {
                econ: "AWEReg",
                econTitle: "Average Weekly Earnings: Regular Pay",
                score: "PayScore",
                scoreTitle: "Pay Score"
              },

              {
                econ: "GrossOperatingSurplus",
                econTitle: "Gross Operating Surplus",
                score: "PreTaxProfitsScore",
                scoreTitle: "Pre Tax Profits Score"
              }
              ];

      var econPlot = function(){

        var econplot = document.getElementById('econframe').contentWindow;

        var econSeries = [];

        econdata.forEach(function(d){
          econSeries.push(+d[globalConcept]);
        });

        econplot.postMessage({
          task : 'restyle',
          update : {
            y : [econSeries]
          }
        }, 'https://plot.ly');

        econplot.postMessage({
          task : 'relayout',
          update : {
            title : globaleconTitle
          }
        }, 'https://plot.ly');

      };

      var meanCVSPlot = function(){

        var meancvsplot = document.getElementById('meancvsframe').contentWindow;

        var meanCVSSeries = [];

        meancvsdata.forEach(function(d){
          if(d.Sector == globalSector && d.ScoreType == globalCurrentOrFuture){
            meanCVSSeries.push(+d[globalScore]);
          }
        })

        meancvsplot.postMessage({
          task : 'restyle',
          update : {
            y : [meanCVSSeries]
          }
        }, 'https://plot.ly');

        meancvsplot.postMessage({
          task : 'relayout',
          update : {
            title : globalscoreTitle
          }
        }, 'https://plot.ly');

      };

      var reBarcount = function(){
        barcount = [0,0,0,0,0,0,0,0,0,0,0];
        agentsdata.forEach(function(d){
          if(globalSector == 'Total'){
            if(d.ActualDateDisplay == globalDate && d.ScoreType == globalCurrentOrFuture){
              barcount[+d[globalScore]+5]++;
            }
          }
          else{
            if(d.ActualDateDisplay == globalDate && d.ScoreType == globalCurrentOrFuture && d.Sector == globalSector){
              barcount[+d[globalScore]+5]++;
            }
          }
        });
      };

      var reBubble = function(){
        meanbubblecount = [0,0,0,0,0, 0, 0,0,0,0,0];
        bubblesizecount = [0,0,0,0,0, 0, 0,0,0,0,0];
        meanbubblecounter = 0;

        var currentCount, currentMean, concept1Score, concept2Score;

        var increment = function(item){
          currentCount = bubblesizecount[+item[globalScore]+5];
          currentMean = meanbubblecount[+item[globalScore]+5];
          concept1Score = +item[globalScore];
          concept2Score = +item[globalSecondScore];

          meanbubblecount[concept1Score+5] = ((currentCount*currentMean)+concept2Score)/(currentCount+1);
          bubblesizecount[concept1Score+5]++;

          /*console.log(bubblesizecount)*/

        };

        agentsdata.forEach(function(d){
          if(globalSector == 'Total'){
            if(d.ActualDateDisplay == globalDate && d.ScoreType == globalCurrentOrFuture){
              increment(d);
            }
          }
          else{
            if(d.ActualDateDisplay == globalDate && d.ScoreType == globalCurrentOrFuture &&
              d.Sector == globalSector){
                increment(d);
              }
          }
        });
      };

      var histPlot = function(){

        var histplot = document.getElementById('histframe').contentWindow;

        reBarcount();

        console.log(barcount);

        histplot.postMessage({
          task : 'restyle',
          update : {
            y : [barcount]
          }
        }, 'https://plot.ly');

        histplot.postMessage({
          task : 'relayout',
          update : {
            title : globalscoreTitle
          }
        }, 'https://plot.ly');

      };

      var secondscorePlot = function(){

        var secondscoreplot = document.getElementById('secondscoreframe').contentWindow;

        reBubble();

        secondscoreplot.postMessage({
          task : 'restyle',
          update: {
            y : [meanbubblecount]
          }
        }, 'https://plot.ly');

        secondscoreplot.postMessage({
          task : 'restyle',
          update: {
            'marker.size' : [bubblesizecount]
          },
          indices : [0]
        }, 'https://plot.ly');

      };

      var rePlot = function(){

        conceptMap.forEach(function(d){
          if(globalConcept == d.econ){
            globalscoreTitle = d.scoreTitle;
            globaleconTitle = d.econTitle;
            globalScore = d.score;
          }
        });

        econPlot();

        meanCVSPlot();

        histPlot();
        
        secondscorePlot();

      };

      d3.select('#econselect').selectAll('option').data(conceptMap)
            .enter().append('option').attr('value', function(d){ return d.econ; })
            .text(function(d){ return d.econTitle + ' (' + d.scoreTitle + ')'; });
      d3.select('#econselect')
            .on('change', function(){
              globalConcept = d3.event.target.value;
              rePlot();
            });

      d3.select('#currentorfutureselect').selectAll('option').data(['Current', 'Future'])
            .enter().append('option').attr('value', function(d){ return d; })
            .text(function(d){ return d; });
      d3.select('#currentorfutureselect')
            .on('change', function(){
              globalCurrentOrFuture = d3.event.target.value;
              rePlot();
            });

      d3.select('#sectorselect').selectAll('option').data(sectorList)
            .enter().append('option').attr('value', function(d){ return d; })
            .text(function(d){ return d; });
      d3.select('#sectorselect')
            .on('change', function(){
              globalSector = d3.event.target.value;
              rePlot();
            });

      d3.select('#dateselect').selectAll('option').data(dateList)
            .enter().append('option').attr('value', function(d){ return d; })
            .text(function(d){ return d; });
      d3.select('#dateselect')
            .on('change', function(){
              globalDate = d3.event.target.value;
              rePlot();
            });

      d3.select('#secondscoreselect').selectAll('option').data(conceptMap)
            .enter().append('option').attr('value', function(d){ return d.score; })
            .attr('selected', function(d){
              if(d.scoreTitle == 'Export Score'){
                return "selected";
              }
            }).text(function(d){ return d.scoreTitle; });
      d3.select('#secondscoreselect')
            .on('change', function(){
              globalSecondScore = d3.event.target.value;
              rePlot();
            });

    });
  });
});
