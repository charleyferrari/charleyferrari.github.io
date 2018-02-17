// python -m SimpleHTTPServer 8888 &.

// using d3.csv with nvd3

function myData() {
    var series1 = [];
    for(var i =1; i < 100; i ++) {
        series1.push({
            x: i, y: 100 / i
        });
    }

    return [
        {
            key: "Series #1",
            values: series1,
            color: "#0000ff"
        }
    ];
}

d3.csv("d3econdata.csv", function(error, data){

    function econData() {

        var parseDate = d3.time.format("%Y-%m-%d").parse;

        var econSeries = [];

        data.forEach(function(d){
            econSeries.push({
                x : parseDate(d.date), y : +d.MeanCVS
            });
        });

        return [
            {
                key: "Econ Series",
                values: econSeries,
                color: "#0000ff"
            }];

    }

    nv.addGraph(function() {
        var chart = nv.models.lineChart()
            .useInteractiveGuideline(true);

        chart.xAxis
            .axisLabel("Date")
            .tickFormat(function(d) { return d3.time.format('%b %Y')(new Date(d)); });

        chart.yAxis
            .axisLabel("Average Company Visit Score")
            .tickFormat(d3.format('.02f'))
            ;



        d3.select("svg")
            .datum(econData())
            .transition().duration(500).call(chart);

        nv.utils.windowResize(
                function() {
                    chart.update();
                }
            );

        return chart;
    });

});