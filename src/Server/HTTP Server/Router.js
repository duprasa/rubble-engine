/*== Http Router Module ==*/

//Status: 4 (stable)
//This module routes Http requests to the appropriate 
//handlers



//Imports
var url    = require('url');
var handle = require('./Handlers').handles;
var log    = require('../Utility/Logger').makeInstance("Http Router");


//Module logging
log.enabled = true;
log.level   = 4;


exports.route = function(rawUrl,response,postData) {
	var parsedUrl = url.parse(rawUrl);
	var pathname = parsedUrl.pathname;
	var category = pathname.split("/")[1];

	//Intercept file requests.
	switch(category) {
		//handle all file cases
		case "scripts": case "images": case "sounds": case "styles": case "json":
			if(pathname.split("/")[2]) {
				var patharray = pathname.split("/");
				patharray = patharray.slice(2);
				pathname = patharray.join('/');
				log.debug(pathname);
				handle[category](response,pathname);
			} else {
				log.debug(pathname);
				handle['notFound'](response);
			}
		break;
		//handle favicon case
		case "favicon.ico":
				handle['images'](response,"favicon.ico");
		break;

		//Page Requests
		default:
			//test if the handle exists
			if (typeof handle[pathname] === 'function') {
				log.debug(pathname);
				handle[pathname](response,postData,parsedUrl);
			} else {
				log.warn("No Request Handler found for " + pathname)
				handle['notFound'](response);
			}
		break;
	}
};
