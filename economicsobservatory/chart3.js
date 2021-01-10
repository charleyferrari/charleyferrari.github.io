Plotly.d3.csv('https://media.githubusercontent.com/media/charleyferrari/charleyferrari.github.io/master/economicsobservatory/used_life_ex.csv', d => {
    console.log(d);
    let xbar = [], ybar = [], xline = [], yline;

    for (let i=0; i<d.length; i++){
        row = d[i];
        if (row['AreaName'] != 'England') {
            xbar.push(row['AreaName']);
            ybar.push(row['Value']);
            xline.push(row['AreaName']);
        } else {
            yline = Array(d.length).fill(row['Value']);
        }
    }

    let data = [
        {
            'x': xbar,
            'y': ybar,
            'width': 0.5,
            'type': 'bar',
            'marker': {
                'color': 'rgb(55,126,184)'
            },
            'showlegend': false,
            'hoverinfo': 'y',
        },
        {
            'x': xline,
            'y': yline,
            'type': 'scatter',
            'line': {
                'color': 'rgb(228,26,28)'
            },
            'mode': 'lines',
            'hoverinfo': 'none',
            'name': 'English Average'
        }
    ];

    let layout = {
        'plot_bgcolor': '#fff',
        'yaxis': {
            'gridcolor': 'rgb(238, 238, 238)',
            'title': 'Healthy life expectancy at birth (male)'
        },
        'legend': {
            'yanchor': 'bottom',
            'y': -0.15,
            'xanchor': 'right',
            'x': 0.5
        }
    };

    let config = {
        'modeBarButtonsToRemove': ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 
            'zoomOut2d', 'autoScale2d', 'resetScale2d', 'toggleHover', 'toggleSpikelines']
    };

    Plotly.newPlot('chart3', data, layout, config);
});