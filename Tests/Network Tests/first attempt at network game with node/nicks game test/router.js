function route(handle,parsedUrl,response,postData) {
	var pathname = parsedUrl.pathname;
	
	if(pathname.split("/")[1] == "scripts") {
		if(pathname.split("/")[2]) {
			handle['scripts'](response,pathname.split("/")[2]);
		} else {
			handle[404](response);
		}
		return;
	}

	if(pathname.split("/")[1] == "images") {
		if(pathname.split("/")[2]) {
			handle['images'](response,pathname.split("/")[2]);
		} else {
			handle[404](response);
		}
		return;
	}

	console.log("routing for: " + pathname);
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response,postData,parsedUrl);
	} else {
		console.log("No Request Handler found for " + pathname)
		handle[404](response);
	}
}

exports.route = route;