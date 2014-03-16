/*== File Manager Module ==*/

//Status: 3 (not sure)
//This module manages loading and removing cachedFiles 
//from memory.



//Imports
var fs 	= require("fs");
//var log = require('./Logger').makeInstance();


//Module logging
//log.enabled = true;
//log.level   = 3;


var cachedFiles = {};
var cachedLog = {};
var loggingFiles = false;
//fetch a file and return more efficient way.
exports.fetchFile = function(path,callback){
	//check if file is in memory
	if(!cachedFiles[path]){
		//check if callback is valid
		if(typeof callback === 'function'){
			//log.debug('fetching file: ' + path);
			//read the file
			fs.readFile( __dirname + path , function(error,file) {
				//file is invalid
				if(error) {
					//call callback with error
					callback(error,null);
				}
				//file is valid
				else {
					cachedFiles[path] = file;
					//call callback with no error
					callback(null,file);
				}
			});
		}else{
			//log.warn('File:' + path +' not loaded yet');
			//return false for user not using callback
			return false;
		}
	}else{
		//log.debug('file in memory: ' + path);
		//call callbakc with in memory file
		callback(null,cachedFiles[path]);
		//return file for user not using callback
		return cachedFiles[path];
	}
};

//fetch a file whether or not it already is in memory
exports.fetchNewFile = function(path,callback){
	//check if callback is valid
	if(typeof callback === 'function'){
		//log.debug('fetching file: ' + path);
		//read the file
		fs.readFile( __dirname + path , function(error,file) {
			//file is invalid
			if(error) {
				//call callback with error
				callback(error,null);
			}
			//file is valid
			else {
				cachedFiles[path] = file;
				//call callback with no error
				callback(null,file);
			}
		});
	}else{
		//log.warn('fetchNewFile called without a callback');
		//return false for user not using callback
		return false;
	}
};
//store a file for future use
exports.cacheFile = function(path){
	fs.readFile( __dirname + path , function(error,file) {
		//file is invalid
		if(error) {
			//call callback with error
			//log.warn('FILE NOT FOUND: ' + error.message);
		}
		//file is valid
		else {
			cachedFiles[path] = file;
			//log.debug('file: '+ path +' is ready');
		}
	});
};
exports.removeFile = function(path){
	if(cachedFiles[path]){
		delete cachedFiles[path];
		return true;
	}else{
		return false;
	}
};
exports.log = function(message,fileName){
	if(cachedLog[fileName]){
		cachedLog[fileName] += (message + '\r\n');
	}else{
		cachedLog[fileName] = message + '\r\n';
	}
	if(!loggingFiles){
		var now = new Date();
		var midnight = 24 * 60;
		var minutesTillMidnight = midnight - (now.getHours() * 60 + now.getMinutes()); 
		setTimeout(logCachedFiles,minutesTillMidnight * 60000);
		loggingFiles = true;
	}
}

function logCachedFiles(){
	for(var fileName in cachedLog){
		var mode = 'a';
		var writeStream = fs.createWriteStream(__dirname + '/output/' + fileName + '.txt', {'flags': mode});
		writeStream.write(cachedLog[fileName] + '\r\n');
	}
	loggingFiles = false;
	console.log('cached files were logged!')
}