/*
==Version 1.1==
the event handler handles all the events triggered on a single dom element
if the dom element doesnt have a tabindex some events wont apply, selectable
elements may still work though.
==march 18 2013 samuel dupras==
==march 18 2013 nicolas correa==
*/
function EventHandler(domElement) {
    if(!domElement) {
            throw "OBJECT NOT CREATED: domElement is not initialized.";
        }
    var states = {Default:{ onKeyDown     : function(e) {},
                            onKeyUp       : function(e) {},
                            onMouseMove   : function(e) {},
                            onMouseDown   : function(e) {},
                            onMouseOver   : function(e) {},
                            onMouseOut    : function(e) {},
                            onMouseUp     : function(e) {},
                            onClick       : function(e) {},
                            onDoubleClick : function(e) {},
                            onFocus       : function(e) {},
                            onBlur        : function(e) {},
                            isPressed     : {up:    false,
                                             down:  false,
                                             left:  false,
                                             right: false,
                                             x:     false,
                                             z:     false,
                                             space: false}}};
    var state = states.Default;
    //validate that someone enters stateName
    this.addState = function(stateName){
        if(!(stateName in states)){
            states[stateName] = {onKeyDown     : function(e) {},
                                 onKeyUp       : function(e) {},
                                 onMouseMove   : function(e) {},
                                 onMouseDown   : function(e) {},
                                 onMouseOver   : function(e) {},
                                 onMouseOut    : function(e) {},
                                 onMouseUp     : function(e) {},
                                 onClick       : function(e) {},
                                 onDoubleClick : function(e) {},
                                 onFocus       : function(e) {},
                                 onBlur        : function(e) {},
                                 isPressed     : {up:    false,
                                                  down:  false,
                                                  left:  false,
                                                  right: false,
                                                  x:     false,
                                                  z:     false,
                                                  space: false}};
        }else{
            console.log("this stateName is already taken");
        } 
    };

    this.removeState = function(stateName){
        if(stateName in states){
            if(state !== states[stateName]){
                delete(states[stateName]);
            }else{
                console.log("you cannot delete the state you are using");
            }
        }else{
            console.log("this state doesnt exist");
        } 
    };
    this.isPressed = state.isPressed;
    //should return a string
    this.currentState = function(){
        console.log(state);
    };
    //just for testing
    this.viewStates = function(){
        console.log(states);
    };

    this.changeState = function(stateName){
        if(stateName in states){
            state = states[stateName];
        }else{
            console.log("this state doesnt exist");
        } 
    };

    this.onKeyDown     = function(func){state.onKeyDown     = func;}
    this.onKeyUp       = function(func){state.onKeyUp       = func;}
    this.onMouseMove   = function(func){state.onMouseMove   = func;}
    this.onMouseDown   = function(func){state.onMouseDown   = func;}
    this.onMouseOver   = function(func){state.onMouseOver   = func;}
    this.onMouseOut    = function(func){state.onMouseOut    = func;}
    this.onMouseUp     = function(func){state.onMouseUp     = func;}
    this.onClick       = function(func){state.onClick       = func;}
    this.onDoubleClick = function(func){state.onDoubleClick = func;}
    this.onFocus       = function(func){state.onFocus       = func;}
    this.onBlur        = function(func){state.onBlur        = func;}


    //wrappers
    function keyDown(e){
        state.onKeyDown(e,state.isPressed);
        //check for keys being pressed
        switch(e.keyCode){
            case 38:
                state.isPressed.up = true;
                break;
            case 40:
                state.isPressed.down = true;
                break;
            case 37:
                state.isPressed.left = true;
                break;
            case 39:
                state.isPressed.right = true;
                break;
            case 32:
                state.isPressed.space = true;
                break;
            case 90:
                state.isPressed.z = true;
                break;
            case 88:
                state.isPressed.x = true;
                break;

        }
    }
    function keyUp(e){
        state.onKeyUp(e,state.isPressed);
        //check for keys being unpressed
        switch(e.keyCode){
            case 38:
                state.isPressed.up = false;
                break;
            case 40:
                state.isPressed.down = false;
                break;
            case 37:
                state.isPressed.left = false;
                break;
            case 39:
                state.isPressed.right = false;
                break;
            case 32:
                state.isPressed.space = false;
                break;
            case 90:
                state.isPressed.z = false;
                break;
            case 88:
                state.isPressed.x = false;
                break;
        }
    }
    function mouseDown(e){
        state.onMouseDown(e);
    }
    function mouseUp(e){
        state.onMouseUp(e);
    }
    function mouseMove(e){
        state.onMouseMove(e);
    }
    function mouseOver(e){
        state.onMouseOver(e);
    }
    function mouseOut(e){
        state.onMouseOut(e);
    }
    function click(e){
        state.onClick(e);
    }
    function doubleClick(e){
        state.onDoubleClick(e);
    }
    function focus(e){
        state.onFocus(e);
    }
    function blur(e){
        state.onBlur(e);
    }
    //for custom onKeysPressed event
    // (function checkKeys(){
    //  state.onKeysPressed(isPressed);
    //  setTimeout(checkKeys,0);
    // })();

    //Add default empty events.
    addEvent('keydown'  , keyDown);
    addEvent('keyup'    , keyUp);
    addEvent('mousedown', mouseDown);
    addEvent('mouseup'  , mouseUp);
    addEvent('mousemove', mouseMove );
    addEvent('mouseover', mouseOver );
    addEvent('mouseout' , mouseOut);
    addEvent('click'    , click);
    addEvent('dblclick' , doubleClick);
    addEvent('focus'    , focus);
    addEvent('blur'     , blur );

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

//testing
// window.onload= function(){
//   var eh = new EventHandler(document.body);
// }