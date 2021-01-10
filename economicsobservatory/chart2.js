Plotly.d3.csv('./used_manchester.csv', d => {
    console.log(d);
    let x = [], y = [], color = [];

    for (let i=0; i<d.length; i++){
        row = d[i];
        x.push(row['Area']);
        y.push(row['Millions']);
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
            'title': 'Population (Millions)'
        }
    };

    let config = {
        'modeBarButtonsToRemove': ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 
            'zoomOut2d', 'autoScale2d', 'resetScale2d', 'toggleHover', 'toggleSpikelines']
    };

    Plotly.newPlot('chart2', data, layout, config);
});