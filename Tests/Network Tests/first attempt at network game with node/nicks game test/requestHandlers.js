var querystring = require("querystring");
var fs = require("fs");
var swig = require("swig");
var templates = require("./templates").templates;

function client(response,postData) {
	console.log("Request handler 'client' was called.");
	
	var template = templates.client;

	var content = template.render();

	response.writeHead(200, {"Content-Type" : "text/html"});
	response.write(content);
	response.end();
}

function notFound(response) {
	response.writeHead(404, {"Content-Type": "text/html"});
	response.write("<p> 404. Page not found. </p>");
	response.end();
}

function scripts(response,filename) {
	console.log("Request handler 'scripts' was called.");
	fs.readFile( "scripts/" + filename , function(error,file) {
		if(error) {
			console.log('error reading script file.');
			response.writeHead(404, {"Content-Type": "text/html"});
			response.write("404. Script not found.");
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
	fs.readFile( "images/" + filename , function(error,file) {
		if(error) {
			console.log('error reading script file.');
			response.writeHead(404, {"Content-Type": "text/html"});
			response.write("404. Script not found.");
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

exports.client = client;


exports.notFound = notFound;
exports.scripts = scripts;
exports.images = images;