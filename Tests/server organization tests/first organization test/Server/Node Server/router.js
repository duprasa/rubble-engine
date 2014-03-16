function route(handle,parsedUrl,response,postData) {
	var pathname = parsedUrl.pathname;
	var category = pathname.split("/")[1];

	//Intercept file requests.
	switch(category) {
		case "scripts":
			if(pathname.split("/")[2]) {
				handle['scripts'](response,pathname.split("/")[2]);
			} else {
				handle[404](response);
			}
			return;
		break;

		case "images":
			if(pathname.split("/")[2]) {
				handle['images'](response,pathname.split("/")[2]);
			} else {
				handle[404](response);
			}
			return;
		break;

		case "favicon.ico":
				handle['images'](response,"favicon.ico");
			return;
		break;

		case "sounds":
			if(pathname.split("/")[2]) {
				handle['sounds'](response,pathname.split("/")[2]);
			} else {
				handle[404](response);
			}
			return;
		break;

		case "styles":
			if(pathname.split("/")[2]) {
				handle['styles'](response,pathname.split("/")[2]);
			} else {
				handle[404](response);
			}
			return;
		break;

		default:
			//Continue.
		break;
	}

	
	//Page Requests
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response,postData,parsedUrl);
	} else {
		console.log("No Request Handler found for " + pathname)
		handle[404](response);
	}
}

//exports
exports.route = route;