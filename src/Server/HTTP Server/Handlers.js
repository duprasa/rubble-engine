/*== Http Handlers Module ==*/

//Status: 4 (stable)
//This module defines what we do with requests after they
//have been routed here, hence handlers



//Imports
var swig 		= require("swig");
var templates   = require("./Templates").templates;
var settings    = require("../Settings").httpServer;
var log         = require('../Utility/Logger').makeInstance("Http Handlers");
var fileManager	= require('../Utility/FileManager');


//Module logging
log.enabled = true;
log.level   = 4;


//Page Request Handlers
exports.handles = {
	notFound:function(response) {
		sendResponse(response,"<p> 404. Page not found. </p>",404,"text/html");
	},

	'/':function(response,postData) {
		log.debug("Request handler 'index' was called.");
		var template = templates.index;
		var content = template({
			domain : settings.domain,
			port : settings.port
		});
		sendResponse(response,content,200,"text/html");
	},
	'/game.html':function(response,postData) {
		log.debug("Request handler 'game' was called.");
		var template = templates.game;
		var content = template({
			domain : settings.domain,
			port : settings.port
		});
		sendResponse(response,content,200,"text/html");
	},
	'/menu.html':function(response,postData) {
		log.debug("Request handler 'menu' was called.");
		var template = templates.menu;
		var content = template();
		sendResponse(response,content,200,"text/html");
	},
	'/mainMenu.html':function(response,postData) {
		log.debug("Request handler 'mainMenu' was called.");
		var template = templates.mainMenu;
		var content = template();
		sendResponse(response,content,200,"text/html");
	},
	'/login.html':function(response,postData) {
		log.debug("Request handler 'login' was called.");
		var template = templates.login;
		var content = template();
		sendResponse(response,content,200,"text/html");
	},
	'/register.html':function(response,postData) {
		log.debug("Request handler 'register' was called.");
		var template = templates.register;
		var content = template();
		sendResponse(response,content,200,"text/html");
	},
	'/loading.html':function(response,postData) {
		log.debug("Request handler 'loading' was called.");
		var template = templates.loading;
		var content = template();
		sendResponse(response,content,200,"text/html");
	},
	'/help.html':function(response,postData) {
		log.debug("Request handler 'help' was called.");
		var template = templates.help;
		var content = template();
		sendResponse(response,content,200,"text/html");
	},
	'/credit.html':function(response,postData) {
		log.debug("Request handler 'credit' was called.");
		var template = templates.credit;
		var content = template();
		sendResponse(response,content,200,"text/html");
	},
	'/incompatible.html':function(response,postData) {
		log.debug("Request handler 'incompatilbe' was called.");
		var template = templates.incompatible;
		var content = template();
		sendResponse(response,content,200,"text/html");
	},
	'/authenticationError.html':function(response,postData) {
		log.debug("Request handler 'authenticationError' was called.");
		var template = templates.authenticationError;
		var content = template();
		sendResponse(response,content,200,"text/html");
	},
	'/error.html':function(response,postData) {
		log.debug("Request handler 'error' was called.");
		var template = templates.error;
		var content = template();
		sendResponse(response,content,200,"text/html");
	},
	'/donate.html':function(response,postData) {
		log.debug("Request handler 'donate' was called.");
		var template = templates.donate;
		var content = template();
		sendResponse(response,content,200,"text/html");
	},
	//File Request Handlers 
	json:function(response,filename){
		log.debug("Request handler 'json' was called.");
		sendFileShared(response,'json/' + filename,"application/json")
	},
	scripts:function(response,filename) {
		log.debug("Request handler 'scripts' was called.");
		sendFile(response,'Scripts/'+ filename,"text/javascript")
	},

	images:function(response,filename) {
		log.debug("Request handler 'images' was called.");
		var extension = filename.substring(filename.indexOf(".") + 1);
		sendFile(response,'Images/'+ filename,"image/" + extension);
	},

	sounds:function(response,filename) {
		log.debug("Request handler 'sounds' was called.");
		var extension = filename.substring(filename.indexOf(".") + 1);
		log.debug('requesting filename: ' + filename);
		//Fix for mp3 problems
		if(extension == 'mp3') {
			extension = 'mpeg';
		}
		sendFile(response,'Sounds/'+ filename,"audio/" + extension);
	},


	styles:function(response,filename) {
		log.debug("Request handler 'styles' was called.");
		sendFile(response,'Styles/'+ filename,"text/css");
	}
};

//Helper functions

function sendResponse(response,file,responseCode,contentType){
	response.writeHead(responseCode, {"Content-Type": contentType});
	response.write(file);
	response.end();
}


function sendFile(response,path,contentType){
	fileManager.fetchFile("/../../Client/" + path,function(error,file){
		if(error) {
			log.warn('error reading ' + path + ' file.');
			sendResponse(response,contentType +" file not found",404,"text/html");
		}
		else {
			sendResponse(response,file,200,contentType);
		}
	});
}
function sendFileShared(response,path,contentType){
	fileManager.fetchFile("/../../Shared/" + path,function(error,file){
		if(error) {
			log.warn('error reading ' + path + ' file.');
			sendResponse(response,contentType +" file not found",404,"text/html");
		}
		else {
			sendResponse(response,file,200,contentType);
		}
	});
}