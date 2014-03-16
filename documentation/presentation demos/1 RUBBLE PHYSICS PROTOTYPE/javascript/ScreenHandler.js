/*
==Version 1.0==
the screen handler simplifies working with the canvas. The canvas must already
be created and have an id.
==april 9 2013 samuel dupras==
==april 9 2013 nicolas correa==
*/
function Screen(canvas,initWidth,initHeight) {

	//check if canvas is set
	if(!canvas) {
		throw 'OBJECT NOT CREATED: Need valid canvas';
	}
	
	var width   = canvas.width  = initWidth  || canvas.width;
	var height  = canvas.height = initHeight || canvas.height;
	var context = canvas.getContext('2d'); 

	canvas.tabIndex     = '1'; //Needed so that it can gain focus. so that it can take key events.
	canvas.innerHTML    = 'Your browser does not support the canvas element.';
	context.fillStyle   = 'black';

	this.get = {width: width, height:height};
	this.clear = function (color) {

		//set default color
		color = color || 'white';
		//fill the canvas with a solid color
		context.fillStyle = color;
		context.fillRect(0,0,width,height);

	};

	this.drawRect = function (x,y,width,height,color) {

		//set defaults
		x      = x      || 0;
		y      = y      || 0;
		width  = width  || 50;
		height = height || 50;
		color  = color  || 'black';
		//draw rect
		context.fillStyle = color;
		context.fillRect(x,y,width,height);

	};

	this.drawText = function (x,y,text,font,color) {

		//set defaults
		x     = x     || 0;
		y     = y     || 0;
		text  = text  || 'Hello World';
		font  = font  || '8px comic sans';
		color = color || 'black';
		//draw text
		context.fillStyle = color;
		context.font      = font ;
		context.fillText(text,x,y);

	};

	this.drawImage = function (src,x,y) {

		//set defaults
		x     = x     || 0;
		y     = y     || 0;
		//should check if src is valid TO DO!

		//draw Image
		var image = new Image();
		//TO DO: must add ie support!
		image.addEventListener('load',function(){
			context.drawImage(image,x || 0,y || 0);
		});
		//TO DO: must add ie support!
		image.addEventListener('error',function(){
			throw 'IMAGE NOT DRAWN: image path is invalid!';
		});
		image.src = src;

	};

	
}