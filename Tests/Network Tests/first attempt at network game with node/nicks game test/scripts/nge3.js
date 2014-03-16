//**************
//EventHandler
//**************
function EventHandler(domElement) {
        if(!domElement) {
                        console.log("domElement is not initialized. can\'t add Handler.");
                        return;
                }
        var me = this;
       
        this.onKeyDown     = function(e) {};
        this.onKeyUp       = function(e) {};
        this.onMouseMove   = function(e) {};
        this.onMouseDown   = function(e) {};
        this.onMouseOver   = function(e) {};
        this.onMouseOut    = function(e) {};
        this.onMouseUp     = function(e) {};
        this.onClick       = function(e) {};
        this.onDoubleClick = function(e) {};
        this.onFocus       = function(e) {};
        this.onBlur        = function(e) {};
 
        //this.onEscape = function() { domElement.destroy(); };
 
        //wrappers
        function keyDown(e){
                me.onKeyDown(e);
        }
        function keyUp(e){
                me.onKeyUp(e);
        }
        function mouseDown(e){
                me.onMouseDown(e);
        }
        function mouseUp(e){
                me.onMouseUp(e);
        }
        function mouseMove(e){
                me.onMouseMove(e);
        }
        function mouseOver(e){
                me.onMouseOver(e);
        }
        function mouseOut(e){
                me.onMouseOut(e);
        }
        function click(e){
                me.onClick(e);
        }
        function doubleClick(e){
                me.onDoubleClick(e);
        }
        function focus(e){
                me.onFocus(e);
        }
        function blur(e){
                me.onBlur(e);
        }
 
        //Add default empty events.
        addEvent('keydown'      , keyDown);
        addEvent('keyup'        , keyUp);
        addEvent('mousedown', mouseDown);
        addEvent('mouseup'      , mouseUp);
        addEvent('mousemove', mouseMove );
        addEvent('mouseover', mouseOver );
        addEvent('mouseout'     , mouseOut);
        addEvent('click'        , click);
        addEvent('dblclick' , doubleClick);
        addEvent('focus'        , focus);
        addEvent('blur'         , blur );
 
        function addEvent(eventName, func) {
                if(domElement.addEventListener) {
                        domElement.addEventListener(eventName, func, false);
                       
                } else if(domElement.attachEvent) {
                        domElement.attachEvent('on' + eventName,func);
                       
                } else {
                        console.log("Error adding event");
                }
        }
}
//**************
//Screen
//**************
function Screen() {
	//TODO: Add buffercanvas and a flip method?
	var canvas; 
	var context;
	var isInitialized = false;
	var containerElement;
	this.events = null;

	var width;
	var height;

	this.isInitialized = function() {
		return isInitialized;
	};
	this.init = function(initWidth,initHeight,htmlElement,flags) {
		if(isInitialized) {
			console.log("Screen already initialized.");
			return;
		}
		if(!(initWidth && initHeight)) {
			console.log("Width or height not specified.");
			return;
		} else {
			width = initWidth;
			height = initHeight;
		}
		var actualFlags;
		if(flags) {
			actualFlags = flags.split("|");

			if(actualFlags.indexOf('FULLSCREEN') != -1) {
			console.log("Sorry, Fullscreen isn\'t implemented yet.");
			}
		}


		canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		canvas.style.border = "2px solid black";
		canvas.tabIndex = "1"; //Needed so that it can gain focus. so that it can take key events.
		canvas.innerHTML = "Your browser does not support the canvas element.";
		
		this.events = new EventHandler(canvas);
		
		context = canvas.getContext("2d");
		context.fillStyle = "black";
		
		containerElement = htmlElement || (document.body);
		containerElement.appendChild(canvas);
		if(!htmlElement) {
			console.log("Container not specified. Canvas will be placed in body.");
		}
		isInitialized = true;
	};
	this.destroy = function () {
		if(!isInitialized) {
			console.log("Screen is not initialized. Cannot destroy.");
			return;
		}
		containerElement.removeChild(canvas);
		canvas = null;
		context = null;
		isInitialized = false;

	};


	this.clear = function (color) {
		if(!isInitialized) {
			console.log("Screen is not initialized.");
			return;
		}
		var actualColor = color || "white";
		context.fillStyle = actualColor;
		context.fillRect(0,0,width,height);
	};

	this.fillRect = function (x,y,recwidth,recheight,color) {
		if(!isInitialized) {
			console.log("Screen is not initialized.");
			return;
		}
		var actualColor = color || "black";
		var rectWidth = recwidth || 50;
		var rectHeight = recheight || 50;
		var rectX = x || 0;
		var rectY = y || 0;

		context.fillStyle = actualColor;
		context.fillRect(rectX, rectY, rectWidth, rectHeight);
		context.fillStyle = "white";
	};
	this.drawText = function (text,x,y,font) {
		if(!isInitialized) {
			console.log("Screen is not initialized.");
			return;
		}
		context.fillStyle = 'black';
		context.font = font || "8px comic sans";
		context.fillText(text,x || 0 , y || 0);
	};
	this.drawSprite = function (sprite,x,y) {
		if(!isInitialized) {
			console.log("Screen is not initialized.");
			return;
		}
		if(!sprite.isReady()) {
			console.log('sprite has not loaded yet.');
			return;
		}

		context.drawImage(sprite.image,x || 0,y || 0);
	};

	this.fuckUpCanvas = function () {
		myImage = context.getImageData(0,0,width,height);
		for(var i = 0; i < (width * height) * 4; i += 4) {
			//First Bytes are red.
			myImage.data[i] = 0;
			//green
			myImage.data[i+1] = 0;
			//blue
			//alpha
		}

		context.putImageData(myImage,0,0);
 	};

 	this.drawEntity = function (entity) {
 		if(!entity) {
 			console.log('Entity does not exist.');
 			return;
 		}
 		if(!entity.getSprite()) {
 			console.log('Entity has no sprite set.');
 			return;
 		}
 		if(entity.getSprite().isReady()) {
 			this.drawSprite(entity.getSprite(),parseInt(entity.x),parseInt(entity.y));
 		}
 	}
	
}
//**************
//Sound
//**************
function Sound(fileName,loopBoolean) {

	var me = this;
	var audio = new Audio(); 
	var loop = loopBoolean || false;
	var ready = false;
	//Check if audio object is supported.
	if(!audio) {
 		console.log("Browser does not support audio objects.");
 		return;
	}
	//Check what file type to play:
	if(audio.canPlayType) {
		var source = document.createElement('source');
		if(audio.canPlayType("audio/ogg") !== "") {
			source.type = "audio/ogg";
			source.src = fileName + '.ogg';
			console.log('Determined browser plays ogg files. adding to audio source...');
			audio.appendChild(source);
		}
		if(audio.canPlayType("audio/wav") !== "") {
			source = document.createElement('source');
			source.type = "audio/wav";
			source.src = fileName + '.wav';
			console.log('Determined browser plays wav files. adding to audio source...');
			audio.appendChild(source);
		}
		if(audio.canPlayType("audio/mpeg") !== "") {
			source = document.createElement('source');
			source.type = "audio/mpeg";
			source.src = fileName + '.mp3';
			console.log('Determined browser plays mp3 files. adding to audio source...');
			audio.appendChild(source);
		}
	} else {
		alert("Browser does not have canPlayType function.");
		return;
	}

	//Attach event to know when file can be played.
	if(audio.addEventListener) {
		audio.addEventListener('canplaythrough',
			function() {
				ready = true;
				console.log('File ready to be played.');
		},false);
		if(loop) {
			audio.addEventListener('ended', function() {
				audio.currentTime = 0;
				me.play();
			},false);
		}
		
	} else if(audio.attachEvent) {
		audio.attachEvent('oncanplaythrough', function() {
			ready = true;
			console.log('File ready to be played.');
		});
		if(loop) {
			audio.attachEvent('onended', function() {
				audio.currentTime = 0;
				me.play();
			});
		}	
	} else {
		console.log('Sound cannot be loaded.');
		return;
	}
	this.volumeUp = function () {
		if(audio.volume <= 0.9) {
			audio.volume += 0.1;
		}
	};
	this.volumeDown = function () {
		if(audio.volume >= 0.1) {
			audio.volume -= 0.1;
		}
	};
	this.isReady = function() {
		return ready;
	}

	this.play = function () {
		if(ready) {
			audio.play();
		}
	};

	this.pause = function() {
		audio.pause();
	};
} 
//**************
//Sprite
//**************
function Sprite(path) {
	var me = this;
	var ready = false;
	this.image = new Image();

	this.isReady = function () {
		return ready;
	};

	this.image.onload = function() {
		ready = true;
	};

	this.image.src = path;

}
//***************************************
//        | THE GAME ENGINE | 
//***************************************
function NetworkEntity(newX,newY,newSprite) {
	this.x = newX || 0;
	this.y = newY || 0;
	var width = 45;
	var height = 45;
	var sprite = newSprite || new Sprite('images/default.png');

	this.getSprite = function() {
		return sprite;
	};

	this.update = function () {

	};

	this.draw = function (screen) {
		screen.drawEntity(this);
	};
}
function GameEntity(newX, newY,newSprite) {
	this.x = newX || 0;
	this.y = newY || 0;
	this.lastX = newX || 0;
	this.lastY = newY || 0;
	var width = 45;
	var height = 45;
	var sprite = newSprite || new Sprite('images/default.png');
	
	//Movement related variables.
	this.velocityX = 0;
	this.velocityY = 0;
	this.moveLeft = false;
	this.moveRight = false;
	this.moveUp = false;
	this.moveDown = false;
	var accelX = 0.5;
	var accelY = 0.5;
	var maxAccelX = 15;
	var maxAccelY = 15;
	var deAccelX = 0.1;
	var deAccelY = 0.1;

	
	this.getSprite = function() {
		return sprite;
	};
	//Every game loop:
	this.update = function () {
		if(this.velocityX != 0) {
			if(this.velocityX > 0) {
				if( (this.velocityX - deAccelX) <= 0) {
					this.velocityX = 0;	
				}
				else {
					this.velocityX -= deAccelX;
				}
			}
			if(this.velocityX < 0) {
				if( (this.velocityX + deAccelX) >= 0) {
					this.velocityX = 0;	
				}
				else {
					this.velocityX += deAccelX;
				}
			}

		this.x += this.velocityX;

		}
		if(this.velocityY != 0) {
			if(this.velocityY > 0) {
				if( (this.velocityY - deAccelY) <= 0) {
					this.velocityY = 0;	
				}
				else {
					this.velocityY -= deAccelY;
				}
			}
			if(this.velocityY < 0) {
				if( (this.velocityY + deAccelY) >= 0) {
					this.velocityY = 0;	
				}
				else {
					this.velocityY += deAccelY;
				}
			}

		this.y += this.velocityY;

		}
		if(this.movingLeft) {
			this.velocityX -= accelX;
		}
		if(this.movingRight) {
			this.velocityX += accelX;
		}
		if(this.movingUp) {
			this.velocityY -= accelY;
		}
		if(this.movingDown) {
			this.velocityY += accelY;
		}
	};

	this.draw = function (screen) {
		screen.drawEntity(this);
	};
}

function Game(screen) {
	//Initialize images? sounds?
	var me = new GameEntity(100,100);
	screen.events.onKeyDown = function(e) {
		switch(e.keyCode) {
			case 37:
				me.movingLeft = true;
			break;
			case 38:
				me.movingUp = true;;
			break;
			case 39:
				me.movingRight = true;
			break;
			case 40:
				me.movingDown = true;
			break;
		}
	};
     screen.events.onKeyUp = function(e) {
		switch(e.keyCode) {
			case 37:
				me.movingLeft = false;
			break;


			case 38:
				me.movingUp = false;;
			break;
			case 39:
				me.movingRight = false;
			break;
			case 40:
				me.movingDown = false;
			break;
		}
	};
	var socket = io.connect('http://192.168.1.8:1000');
	socket.on('initSelf',function(name) {
			me.name = name;
			entities[name] = me;
		});

	socket.on('initPlayers',function(players) {
		for(i in players) {
			entities[players[i].name] = new NetworkEntity(players[i].x,players[i].y);
			entities[players[i].name].name = players[i].name;
		}
	});

	socket.on('playerConnected',function(player) {
			entities[player.name] = new NetworkEntity(player.x,player.y);
			entities[player.name].name = player.name;
			console.log(player.name + " logged in.");
			console.log(entities[player.name]);
	});

	socket.on('playerDisconnected',function(player) {
		console.log(player.name + " logged out.");
		delete entities[player.name];
	});

	socket.on('initMonsters',function(monsters) {
		for(i in monsters){
			entities["MONSTER-" + i] = new NetworkEntity(monsters[i].x,monsters[i].y);
		}
	});

	socket.on('playerUpdate', function (players) {	
			for(var i = 0; i < players.content.length; i++) {
				if(players.content[i].name != me.name) { //Does not update self position.
					entities[players.content[i].name].x = players.content[i].x;
					entities[players.content[i].name].y = players.content[i].y;
				}
			}
	});

    socket.on('monsterUpdate', function (monsters) {	
			for(i in monsters) {
				entities["MONSTER-" + i].x = monsters[i].x;
				entities["MONSTER-" + i].y = monsters[i].y;
			}
        }
    );
    var clientMonsters = {};
	var entities = {};
	var that = this;
	var running = false;

	this.run = function () {
		if(running) {
			console.log("game is already running.");
			return;
		}
		var animFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        null ;

	    if ( animFrame !== null ) {
	        var recursiveAnim = function() {
	            mainloop();
	            animFrame( recursiveAnim );
	        };
	    // start the mainloop
	    animFrame( recursiveAnim );
	    } else {
	        var ONE_FRAME_TIME = 1000.0 / 60.0 ;
	        setInterval( mainloop, ONE_FRAME_TIME );
	    }

	    running = true;
	};

	function updateGame() {
		for(i in entities) {
			entities[i].update();
			if(i == me.name) {
				if(parseInt(me.x) != me.lastX || parseInt(me.y) != me.lastY) {
					me.lastX = parseInt(me.x);
					me.lastY = parseInt(me.y);
					socket.emit("moved", { x : parseInt(me.x), y: parseInt(me.y) });
				}
			}
		}
	}

	function drawGame() {
		screen.clear();
		for(i in entities) {
			entities[i].draw(screen);
		}
	}


	function mainloop() {
        updateGame();
        drawGame();
    };


}


