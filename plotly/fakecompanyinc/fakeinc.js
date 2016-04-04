Plotly.d3.csv('https://media.githubusercontent.com/media/charleyferrari/charleyferrari.github.io/master/plotly/fakecompanyinc/usage2015.csv', function(err, rows){

  var testlist = [];

  rows.forEach(function(d){
    var booltest = true;
    testlist.forEach(function(t){
      if(t == d.Industry){
        booltest = false;
      }
    });
    if(booltest){
      testlist.push(d.Industry);
    }
  });
/*
  Plotly.d3.select('#dropdown select')
    .selectAll('option')
    .data(testlist)
    .enter()
    .append('option')
    .text(function(d){ return d; })
    .attr('value', function(d){ return d; });

  /*
  function unpack(rows, key){
    return rows.map(function(row) { return row[key]; });
  }

  var allIndustries = unpack(rows, 'Industry'),
      allMonths = [1,2,3,4,5,6,7,8,9,10,11,12],
      listofIndustries = [],
      currentIndustry,
      currentSales = [],
      currentMonths = [1,2,3,4,5,6,7,8,9,10,11,12];



  for (var i = 0; i < allIndustries.length; i++ ){
      if (listofIndustries.indexOf(allIndustries[i]) === -1 ){
          listofIndustries.push(allindustries[i]);
      }
  }

  function getIndustryData(chosenIndustry) {
      currentSales = [0,0,0,0,0,0,0,0,0,0,0,0];

      for(var i = 0; i < 12; i++){
        data.forEach(function(d){
          if(d.Month == i && d.Industry == chosenIndustry){
            currentSales[i] += d.Price;
          }
        });
      }

  };
  */

});
