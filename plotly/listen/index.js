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
    alert(message.type);
    console.log(message); // prints object for zoom, click, or hover event
});
