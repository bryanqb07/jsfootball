import MovingObject from "./moving_object";

class Player extends MovingObject{
    constructor(options){
        super(options);
        this.options.radius = 20;
    }
}

export default Player;