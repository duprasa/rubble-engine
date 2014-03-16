/*== Logger Module ==*/

//Status: 4 (Stable)
//Logger module simply logs info, warnings or debug info
//depending on server settings.



//Imports
var settings = require("./server_settings");

//private vars
var red, blue, reset, green;
red   = '\033[31m';
blue  = '\033[34m';
green  = '\033[36m';
beige = '\033[33m';
reset = '\033[0m';


var warn = function(message) {
	if(settings.moduleEnabled["logger"] == false) {
		return;
	}

	if(settings.logImportance >= 2) {
		console.log(red + message + reset);
	}
};


var info  = function(message) {

	if(settings.moduleEnabled["logger"] == false) {
		return;
	}

	if(settings.logImportance >= 3) {
		console.log(green + message + reset);
	}

};


var debug = function(message) {

	if(settings.moduleEnabled["logger"] == false) {
		return;
	}

	if(settings.logImportance >= 4) {
		console.log( beige + message + reset );
	}

};


//Exports
exports.info = info;
exports.debug = debug;
exports.warn = warn;