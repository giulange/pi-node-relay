var http = require("http");
var url = require("url");
var querystring = require("querystring");
var gpio = require("pi-gpio");

  function onRequest(request, response) {

  	// Get data
    var queryData = url.parse(request.url, true).query;
    console.log("State " + queryData.state + " received.");

    // Apply command
    if (queryData.state == 'on') {
    	gpio.open(7, "output", function(err) {     
    		gpio.write(7, 1, function() {  
        		gpio.close(7);                   
   			});
		});
    }
    if (queryData.state == 'off') {
		gpio.open(7, "output", function(err) {     
    		gpio.write(7, 0, function() {  
        		gpio.close(7);                   
   			});
		});
    } 
    
    // Answer
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end();
  }

  http.createServer(onRequest).listen(80);
  console.log("Server has started.");