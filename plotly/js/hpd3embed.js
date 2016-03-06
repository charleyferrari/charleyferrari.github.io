Plotly.d3.csv('https://raw.githubusercontent.com/charleyferrari/d3hpi/master/hpsa.csv', function(err, rows){

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    var allMetroNames = unpack(rows, 'Metro'),
        allDATE = unpack(rows, 'DATE'),
        allHPI = unpack(rows, 'HPI'),
        allTier = unpack(rows, 'Tier'),
        listofMetros = [],
        currentMetro,
        currentLowHPI = [],
        currentMiddleHPI = [],
        currentHighHPI = [],
        currentDATE = [];

    for (var i = 0; i < allMetroNames.length; i++ ){
        if (listofMetros.indexOf(allMetroNames[i]) === -1 ){
            listofMetros.push(allMetroNames[i]);
        }
    }

    function getMetroData(chosenMetro) {
        currentLowHPI = [];
        currentMiddleHPI = [];
        currentHighHPI = [];
        currentDATE = [];
        for (var i = 0 ; i < allMetroNames.length ; i++){
            if ( allMetroNames[i] == chosenMetro && allTier[i] == 'Low') {
                currentLowHPI.push(allHPI[i]);
                currentDATE.push(allDATE[i]);
            }
            if ( allMetroNames[i] == chosenMetro && allTier[i] == 'Middle') {
                currentMiddleHPI.push(allHPI[i]);
            }
            if ( allMetroNames[i] == chosenMetro && allTier[i] == 'High') {
                currentHighHPI.push(allHPI[i]);
            }
        }
    };


    function setBubblePlot(chosenMetro) {

      var Plot = {
          id: 'embedplot',
          domainUrl: 'https://plot.ly'
      };


      Plot.iframe = document.getElementById(Plot.id);
      Plot.graphContentWindow = Plot.iframe.contentWindow;

      Plot.post = function post(o) {
          Plot.graphContentWindow.postMessage(o, Plot.domainUrl);
      };

      getMetroData(chosenMetro);


      Plot.post({
           task: 'restyle',
           update: {
             y: [currentLowHPI, currentMiddleHPI, currentHighHPI],
             layout: {
               title: "test"
             }
           }
      });

      Plot.post({
        task : 'relayout',
        update: {
          title: chosenMetro + " HPI"
        }
      })




    };

    var innerContainer = document.querySelector('[data-num="0"'),
        plotEl = innerContainer.querySelector('.plot'),
        metroSelector = innerContainer.querySelector('.metrodata');

    function assignOptions(textArray, selector) {
        for (var i = 0; i < textArray.length;  i++) {
            var currentOption = document.createElement('option');
            currentOption.text = textArray[i];
            selector.appendChild(currentOption);
        }
    }

    assignOptions(listofMetros, metroSelector);

    function updateMetro(){
        setBubblePlot(metroSelector.value);
    }

    metroSelector.addEventListener('change', updateMetro, false);



});
