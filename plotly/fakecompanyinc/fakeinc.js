

Plotly.d3.csv('https://media.githubusercontent.com/media/charleyferrari/charleyferrari.github.io/master/plotly/fakecompanyinc/usage2015.csv', function(err, rows){

  var industrylist = [],
      pricecount = [0,0,0,0,0,0,0,0,0,0,0,0],
      volcount = [0,0,0,0,0,0,0,0,0,0,0,0];

  rows.forEach(function(d){
    var booltest = true;
    industrylist.forEach(function(t){
      if(t.Industry == d.Industry){
        booltest = false;
      }
    });
    if(booltest){
      industrylist.push({
        Industry: d.Industry,
        Bool: true
      });
    }
    pricecount[d.Month-1] += d.Price*1;
    volcount[d.Month-1] += 1;
  });

  var pricevolset = 'price';

  var datelist = ['2015-01-01', '2015-02-01', '2015-03-01', '2015-04-01',
                  '2015-05-01', '2015-06-01', '2015-07-01', '2015-08-01',
                  '2015-09-01', '2015-10-01', '2015-11-01', '2015-12-01'];

  var data = [
    {
      name : 'price',
      type : 'bar',
      x : datelist,
      y : volcount
    }
  ];

  var layout = {
    yaxis : {
      type : 'linear',
      autorange : true
    },
    xaxis : {
      type : 'date',
      range : [1418878800000, 1450155600000],
      autorange : true
    },
    autosize : true
  };

  console.log(pricecount);

  Plotly.newPlot('plot', data, layout, {showLink : true});

  var pricevolselect = d3.select('#pricevol form').selectAll('div').data(['Price', 'Volume']).enter()
                          .append('div').attr('id', function(d){ return d; });

  pricevolselect.append('input')
                .attr('type', 'radio')
                .attr('name', 'pricevol')
                .property('checked', true)
                .attr('value', function(d){ return d.Industry; })
                .on('change', function(d){
                  checkchange(d, 'pricevol');
                })

  pricevolselect.append('label')
                .text(function(d){ return d; });

  var industrycheckselect = d3.select('#industrycheck form').selectAll('div').data(industrylist).enter()
                              .append('div').attr('id', function(d){ return d.Industry; });

  industrycheckselect.append('input')
                      .attr('type', 'checkbox')
                      .attr('name', 'Industry')
                      .property('checked', true)
                      .attr('value', function(d){ return d.Industry; })
                      .on('change', function(d){
                        checkchange(d, 'industry');
                      });

  industrycheckselect.append('label')
                      .text(function(d){ return d.Industry; });

  var checkchange = function(d, changetype){
    if(changetype == 'industry'){
      industrylist.forEach(function(t){
        if(d.Industry == t.Industry){
          t.Bool = !t.Bool;
        }
      });
      pricecount = [0,0,0,0,0,0,0,0,0,0,0,0];
      volcount = [0,0,0,0,0,0,0,0,0,0,0,0];
      var industrytest = false;
      rows.forEach(function(t){
        industrytest = false;
        industrylist.forEach(function(u){
          if((t.Industry == u.Industry) && u.Bool){
            pricecount[t.Month-1] += t.Price*1;
            volcount[t.Month-1] += 1;
          }
        });
      });

      var dataupdate = {
        y : [pricecount]
      };

      Plotly.restyle('plot',dataupdate);


      console.log(pricecount);
    }
    if(changetype == 'pricevol'){

      pricevolset = d;
      industrylist.forEach(function(t){
        if(d.Industry == t.Industry){
          t.Bool = !t.Bool;
        }
      });
      pricecount = [0,0,0,0,0,0,0,0,0,0,0,0];
      volcount = [0,0,0,0,0,0,0,0,0,0,0,0];
      var industrytest = false;
      rows.forEach(function(t){
        industrytest = false;
        industrylist.forEach(function(u){
          if((t.Industry == u.Industry) && u.Bool){
            pricecount[t.Month-1] += t.Price*1;
            volcount[t.Month-1] += 1;
          }
        });
      });

      if(pricevolset == 'Price'){
        var dataupdate = {
          y : [pricecount]
        };
      }

      if(pricevolset == 'Volume'){
        var dataupdate = {
          y : [volcount]
        };
      }

      Plotly.restyle('plot',dataupdate);


      console.log(pricecount);
    }
  };

});
