
var Plot = {
  id : 'plot',
  domainUrl : 'https://plot.ly'
};

Plot.iframe = document.getElementById(Plot.id);

Plot.post = function post(o) {
    Plot.graphContentWindow.postMessage(o, Plot.domainUrl);
};


var function updategraph(){

  filter = d3.event.target.value;

  d3.csv('nyctotcount.csv', function(error, data){

    var graphdata = [];

    data.forEach(function(d){
      if(d.filtering == filter){
        graphdata.push({
          Lon: d.LonRound, Lat: d.LatRound, Count: d.Count
        });
      }
    })

    Plot.post({
      'task' : 'restyle',
      'update' : {
        'x' : graphdata.Lon,
        'y' : graphdata.Lat,
        'z' : graphdata.Count
      },
      'indices' : [0]
    })

  });
};

d3.select("#selection select")
  .on("change", updategraph);
