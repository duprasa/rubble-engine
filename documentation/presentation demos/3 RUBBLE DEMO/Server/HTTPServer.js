/*== Server Module ==*/

//Status: 4 (stable)
//This module creates and starts the all three servers.
//It is only run once every time the server is restarted.



//Imports
var http        = require('http');
var settings    = require('./Settings').httpServer;
var httpHandler = require('./HTTP Server/HTTPHandler');
var log         = require('./Utility/Logger').makeInstance("Server");


//Module logging
log.enabled = true;
log.level   = 3;


exports.start = function(){

	//start the servers
	var HttpServer = http.createServer(httpHandler.onRequest);
	HttpServer.listen(settings.port);

	log.file("Http Server Starting...");
	log.info('Http Server starting on port: ' + settings.port);
	

	//start http handler
	httpHandler.init();
};