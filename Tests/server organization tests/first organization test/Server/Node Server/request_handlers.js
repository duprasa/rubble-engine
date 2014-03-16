//Imports 
var querystring = require("querystring");
var fs = require("fs");
var swig = require("swig");
var templates = require("./templates").templates;
var settings = require("./settings").settings;

//Page Request Handlers
function notFound(response) {
	response.writeHead(404, {"Content-Type": "text/html"});
	response.write("<p> 404. Page not found. </p>");
	response.end();
}

function client(response,postData) {
	console.log("Request handler 'client' was called.");
	
	var template = templates.client;
	
	var content = template.render({
		domain : settings.domain,
		port : settings.port
	});

	response.writeHead(200, {"Content-Type" : "text/html"});
	response.write(content);
	response.end();
}

//File Request Handlers 
function scripts(response,filename) {
	console.log("Request handler 'scripts' was called.");
	fs.readFile( __dirname + "/../../Client/Scripts/" + filename , function(error,file) {
		if(error) {
			console.log('error reading script file.');
			response.writeHead(404, {"Content-Type": "text/html"});
			response.write("Script file not found.");
			response.end();
		}
		else {
			response.writeHead(200, {"Content-Type": "text/javascript"});
			response.write(file);
			response.end();
		}
	});
}

function images(response,filename) {
	console.log("Request handler 'images' was called.");
	fs.readFile( __dirname + "/../../Client/Images/" + filename , function(error,file) {
		if(error) {
			console.log('error reading image file.');
			response.writeHead(404, {"Content-Type": "text/html"});
			response.write("Image file not found.");
			response.end();
		}
		else {
			var extension = filename.substring(filename.indexOf(".") + 1);
			response.writeHead(200, {"Content-Type": "image/" + extension});
			response.write(file);
			response.end();
		}
	});
}

function sounds(response,filename) {
	console.log("Request handler 'sounds' was called.");
	fs.readFile( __dirname + "/../../Client/Sounds/" + filename , function(error,file) {
		if(error) {
			console.log('error reading audio file.');
			response.writeHead(404, {"Content-Type": "text/html"});
			response.write("Sound file not found.");
			response.end();
		}
		else {
			var extension = filename.substring(filename.indexOf(".") + 1);
			response.writeHead(200, {"Content-Type": "audio/" + extension});
			response.write(file);
			response.end();
		}
	});
}


function styles(response,filename) {
	console.log("Request handler 'styles' was called.");
	fs.readFile( __dirname + "/../../Client/Styles/" + filename , function(error,file) {
		if(error) {
			console.log('error reading style file.');
			response.writeHead(404, {"Content-Type": "text/html"});
			response.write("Stylesheet file not found.");
			response.end();
		}
		else {
			response.writeHead(200, {"Content-Type": "text/css"});
			response.write(file);
			response.end();
		}
	});
}

//Exports
exports.notFound = notFound;
exports.client = client;

exports.scripts = scripts;
exports.images = images;
exports.sounds = sounds;
exports.styles = styles;