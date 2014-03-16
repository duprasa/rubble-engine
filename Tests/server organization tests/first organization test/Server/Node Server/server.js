//Imports
var http = require("http");
var url  = require("url");
var io = require('socket.io');
var settings = require("./settings").settings;

function start (route,handle) {

	function onRequest(request,response) {
		console.log('URL Requested: ' + request.url);
		var parsedUrl = url.parse(request.url);
		var postData = "";
		
		//set encoding to UTF-8
		request.setEncoding( settings.encoding );

		//add listener to receieve post data chunks from client
		request.addListener('data', function(chunk) {
			postData += chunk;
			console.log("Received POST data chunk '" +
				chunk + "'");
		});

		//when all post data, if there is any, has been receieved
		//route the request to the appropriate request handler.
		request.addListener('end',function() {
			route(handle,parsedUrl,response,postData);
		});
	}


	//Start listening 
	var app = http.createServer(onRequest);
	var socketIO = io.listen(app);
	console.log("Server starting on port: " + settings.port);
	app.listen(settings.port);

	//set some defaults to socketIO
	//socketIO.set('close timeout', settings.closeTimeout);
	//socketIO.set('heartbeat timeout', settings.heartbeatTimeout);
	//socketIO.set('polling duration', settings.pollingDuration);
	//socketIO.set('heartbeat interval', settings.heartbeatInterval);
	socketIO.set('log level', settings.logLevel);

	//return socketIO so that we can communicate with clients using it.
	return socketIO;
}

//exports
exports.start = start;