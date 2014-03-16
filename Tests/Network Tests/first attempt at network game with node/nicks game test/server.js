var http = require("http");
var url  = require("url");
var io = require('socket.io');


function start (route,handle) {

	//onRequest runs everytime a client requests something
	function onRequest(request,response) {
		console.log(request.url);
		var parsedUrl = url.parse(request.url);
		var postData = "";
		
		//set encoding to UTF-8
		request.setEncoding("utf8");

		//add listener to receieve post data chunks from client
		request.addListener('data', function(chunk) {
			postData += chunk;
			console.log("Received POST data chunk '" +
				chunk + "'");
		});

		//when all post data, if there is any, has been receieved
		//route the request to the appropriate request handler.
		request.addListener('end',function() {
			//function route takes:
			/*handle: associative array of all the request handlers.*/
			/*pathname: parsed url containing only what's after the domain 
			            and before the query parameters */
			/*response: what we will use to answer the client */
			/*postData: any post data the request might have */
			route(handle,parsedUrl,response,postData);
		});
	}


	//Start listening 
	var app = http.createServer(onRequest);
	var ioreturn = io.listen(app);
	app.listen(1000);

	ioreturn.set('close timeout',7);
	ioreturn.set('heartbeat timeout',14);
	ioreturn.set('polling duration',7);
	ioreturn.set('heartbeat interval',7);
	ioreturn.set('log level',1);

	return ioreturn;
}

//module exports
exports.start = start;