var Wall = Entity.subClass({
    init: function(x,y,width,height,color){
        this._super(x,y,height,width,color);
        this.color = "#234567";
        this.collision.fixed = true;
        this.decel.x = 0;
        this.velocity.x = 0;
        this.accel.x = 0;
    }
});

Wall.prototype.onCollision = function(colEntity,direction){
    //Default Collision behavior used with Player and Box
    if(colEntity.collision.ghost){
        this.color = "black";
        return;
    }
    var newlocation;
    switch(direction){
        case 'x':
            if(colEntity.collision.fixed){
                //Stop Entity
            }else{
                //push Entity
                colEntity.velocity.x = this.velocity.x;
            }
            //this.velocity.x = 0;
            break;
        case 'y':             
            if(colEntity.collision.fixed){
                //Stop Entity
            }else{
                //push Entity
                colEntity.velocity.y = this.velocity.y;
            }
            //this.velocity.y = 0;
            break;
    }
};