import MovingObject from "./moving_object";

class Player extends MovingObject{
    constructor(options){
        super(options);
        this.options.color = "#00FF00";
    }
}

export default Player;