Plotly.d3.csv('./used_overcrowding.csv', d => {
    console.log(d);
    let x = [], y = [], color = [];

    for (let i=0; i<d.length; i++){
        row = d[i];
        x.push(row['area label']);
        y.push(row['Overcrowded households (%).1']);
        color.push(row['fill']);
    }

    let data = [{
        'x': x,
        'y': y,
        'width': 0.5,
        'type': 'bar',
        'marker': {
            'color': color,
        },
        'hoverinfo': 'y'
    }];

    let layout = {
        'plot_bgcolor': '#fff',
        'yaxis': {
            'gridcolor': 'rgb(238, 238, 238)',
            'ticksuffix': '%'
        }
    };

    let config = {
        'modeBarButtonsToRemove': ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 
            'zoomOut2d', 'autoScale2d', 'resetScale2d', 'toggleHover', 'toggleSpikelines']
    };

    Plotly.newPlot('chart4', data, layout, config);
});