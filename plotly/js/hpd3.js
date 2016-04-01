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

    //Default Metro Data

    setBubblePlot('Atlanta');

    function setBubblePlot(chosenMetro) {
        getMetroData(chosenMetro);

        var trace1 = {
            x: currentDATE,
            y: currentLowHPI,
            mode: 'lines+markers',
            marker: {
                size: 4,
                opacity: 0.5
            }
        };

        var trace2 = {
          x: currentDATE,
          y: currentMiddleHPI,
          mode: 'lines+markers',
          marker: {
            size: 4,
            opacity: 0.5
          }
        };

        var trace3 = {
          x: currentDATE,
          y: currentHighHPI,
          mode: 'lines+markers',
          marker: {
            size: 4,
            opacity: 0.5
          }
        };

        var data = [trace1,trace2,trace3];

        var layout = {
            title:'Line and Scatter Plot',
            height: 400,
            width: 480
        };

        Plotly.newPlot('plotdiv', data, layout, {showLink: true});
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
        //setBubblePlot(metroSelector.value);
        getMetroData(metroSelector.value);

        var dataupdate = {
          y: [currentLowHPI, currentMiddleHPI, currentHighHPI]
        };

        Plotly.restyle('plotdiv',dataupdate,[0,1,2]);
    }

    metroSelector.addEventListener('change', updateMetro, false);



});
