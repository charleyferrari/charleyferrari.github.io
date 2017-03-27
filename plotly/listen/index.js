// Grab the embed's contentWindow by the iframe id
var plot = document.getElementById('plot').contentWindow;

// send a message to the contentWindow
plot.postMessage(
    {
        task: 'listen',
        events: ['zoom','click','hover']
    }, 'https://plot.ly');

window.addEventListener('message', function(e) {
    var message = e.data;
    //alert(message.type);
    console.log(message); // prints object for zoom, click, or hover event
});

var pinger = setInterval(function(){
    plot.postMessage({task: 'ping'}, 'https://plot.ly')
}, 100);

window.addEventListener('message', function(e) {
    var message = e.data;
    if(message.pong && pinger !== null) {
        clearInterval(pinger);
        pinger = null;
        plot.postMessage({task: 'listen', events: ['zoom', 'click', 'hover']}, 'https://plot.ly');
    }
});
