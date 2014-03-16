/*
==Version 1.1==
the screen handler simplifies working with the canvas. The canvas must already
be created and have an id.
==april 9 2013 samuel dupras==
==april 9 2013 nicolas correa==
==may 14 2013 samuel dupras== //added sprites cache
*/
"use strict";
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
	var sprites = {};
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
		var x      = x 		|| 0;
		var y      = y      || 0;
		var width  = width  || 50;
		var height = height || 50;
		var color  = color  || 'black';
		//draw rect
		context.fillStyle = color;
		context.fillRect(Math.round(x),Math.round(y),Math.round(width),Math.round(height));

	};

	this.drawText = function (x,y,text,font,color) {

		//set defaults
		var x     = x     || 0;
		var y     = y     || 0;
		var text  = text  || 'Hello World';
		var font  = font  || '8px comic sans';
		var color = color || 'black';
		//draw text
		context.fillStyle = color;
		context.font      = font ;
		context.fillText(text,Math.round(x),Math.round(y));

	};
	this.getSprites = function(){
		return sprites;
	};
	this.drawImage = function (src,x,y) {

		//set defaults
		var x     = x     || 0;
		var y     = y     || 0;
		//should check if src is valid TO DO!

		//draw Image
		if(!(src in sprites)){
			var image = new Image();
			sprites[src] = {image:image, isReady:false};
			image.onload = function() {
				sprites[src].isReady = true;
			};
			image.onerror = function(){
				throw 'IMAGE NOT DRAWN:invalid path ' + src;
			};
			image.src = src;
		}
		if(sprites[src].isReady){
			context.drawImage(sprites[src].image,Math.round(x),Math.round(y));
		}else{
			console.log('IMAGE NOT DRAWN: image: ' + src + " is not loaded yet!");
		}


	};

	
}