var Box = Entity.subClass({
    init: function(x,y,width,height,color){
        this._super(x,y,height,width,color);
        this.color = "#65435";
        this.collision.fixed = false;
    }
});