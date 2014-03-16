function Camera(screen,entity){
    this.offsetX = function(){return (screen.get.width / 2) - (Math.round(entity.location.x))};
    this.offsetY = function(){return (screen.get.height / 2) - (Math.round(entity.location.y))};
    this.changeTarget = function(entity){
	    this.offsetX = function(){return (screen.get.width / 2) - (Math.round(entity.location.x))};
	    this.offsetY = function(){return (screen.get.height / 2) - (Math.round(entity.location.y))};
    };
}