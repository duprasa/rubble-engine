//add object oriented programming method
(function() {
    var initializing = false,
    //this pattern is to test if the function as a_super string
    superPattern = /xyz/.test(function() { xyz; }) ? /\b_super\b/ : /.*/;
    Object.subClass = function(properties) {
        var _super = this.prototype;
        //why do we change initializing?
        initializing = true;
        var proto = new this();
        initializing = false;

        for (var name in properties) {
            proto[name] = typeof properties[name] == "function" &&
                          typeof _super[name] == "function" &&
                          superPattern.test(properties[name]) ?
            (function(name, fn) {
                return function() {
                    var tmp = this._super;

                    this._super = _super[name];

                    var ret = fn.apply(this, arguments);
                    this._super = tmp;
                    return ret;
                };
            })(name, properties[name]) :
            properties[name];
        }

        function Class() {
            // All construction is actually done in the init method
            if (!initializing && this.init){
                this.init.apply(this, arguments);
            }
        }
        Class.prototype = proto;

        Class.constructor = Class;

        Class.subClass = arguments.callee;
        return Class;
    };
})();
//add cross platform request animation frame to window
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();