
Plotly.d3.csv('https://media.githubusercontent.com/media/charleyferrari/charleyferrari.github.io/master/plotly/bankofengland/agents.csv', function(err, rows){

  var conceptList = ["DemandScore","ExportScore","InvestmentScore",
  "CapacityScore","EmploymentScore","RecruitmentScore","TotalLabourCostsScore",
  "PayScore","NonLabourCostsScore","OutputPricesScore","PreTaxProfitsScore"],
      dateList = [],
      fulldateList = [],
      currentorfutureList = ['Current', 'Future'],
      fullsectorList = []
      sectorList = [];

rows.forEach(function(d){
  fulldateList.push(d.ActualDateDisplay);
  fullsectorList.push(d.Sector);
});

Array.prototype.unique2 = function()
{
	var n = {},r=[];
	for(var i = 0; i < this.length; i++)
	{
		if (!n[this[i]])
		{
			n[this[i]] = true;
			r.push(this[i]);
		}
	}
	return r;
}

dateList = fulldateList.unique2();
sectorList = fullsectorList.unique2();
sectorList.unshift('Total');

/*

  rows.forEach(function(d){
    var booltest = true;
    dateList.forEach(function(t){
      if(t == d.ActualDateDisplay){
        booltest = false;
      }
    });
    if(booltest){
      dateList.push(d);
    }
    booltest = true;
    sectorList.forEach(function(t){
      if(t == d.Sector){
        booltest = false;
      }
    });
    if(booltest){
      sectorList.push(d);
    }
  });

  */

  var globalConcept = 'DemandScore'
      globalDate = 'Q1-2008',
      globalCurrentorfuture = 'Current',
      globalSector = 'Total' ,
      barcount = [0,0,0,0,0,0,0,0,0,0,0];



  var reBarcount = function(){
    barcount = [0,0,0,0,0,0,0,0,0,0,0];
    rows.forEach(function(d){
      if(globalSector == 'Total'){
        if(d.ActualDateDisplay == globalDate && d.ScoreType == globalCurrentorfuture){
          barcount[+d[globalConcept]+5]++;
        }
      }
      else{
        if(d.ActualDateDisplay == globalDate && d.ScoreType == globalCurrentorfuture && d.Sector == globalSector){
          barcount[+d[globalConcept]+5]++;
        }
      }
    });
  };


  var rePlot = function(){
    reBarcount();

    var Plot = document.getElementById('plot').contentWindow;

    Plot.postMessage({
      task : 'restyle',
      update : {
        y : [barcount]
      }
    }, 'https://plot.ly');


    /*

    dataupdate = {
      y : [barcount]
    };

    Plotly.restyle('plotdiv', dataupdate);

    */

  };

  d3.select('#conceptselect').selectAll('option').data(conceptList)
    .enter().append('option').attr('value', function(d){ return d; })
    .text(function(d){ return d; });
  d3.select('#conceptselect')
    .on('change', function(d){
      globalConcept = d3.event.target.value;
      rePlot();
    });

  d3.select('#dateselect').selectAll('option').data(dateList)
    .enter().append('option').text(function(d){ return d; });
  d3.select('#dateselect')
    .on('change', function(d){
      globalDate = d3.event.target.value;
      rePlot();
    });

  d3.select('#currentorfutureselect').selectAll('option').data(currentorfutureList)
    .enter().append('option').text(function(d){ return d; });
  d3.select('#currentorfutureselect')
    .on('change', function(d){
      globalCurrentOrFuture = d3.event.target.value;
      rePlot();
    });

  d3.select('#sectorselect').selectAll('option').data(sectorList)
    .enter().append('option').text(function(d){ return d; });
  d3.select('#sectorselect')
    .on('change', function(d){
      globalSector = d3.event.target.value;
      rePlot();
    });



});
