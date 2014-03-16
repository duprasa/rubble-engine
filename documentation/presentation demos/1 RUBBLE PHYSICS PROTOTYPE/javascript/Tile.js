var Hole = Entity.subClass({
    init:function(x,y,width,height,color){
        this._super(x,y,height,width,color);
        this.color="654345";
        this.collision.ghost = true;
    }
});

Hole.prototype.onCollision = function(colEntity,direction){
    //Default Collision behavior used with Player and Box
    console.log(typeof(colEntity))
};