import MovingObject from "./moving_object";

class Football extends MovingObject{
    constructor(options){
        super(options);
        this.options.radius = 5;
        this.options.color = "#FF0000";
    }
}

export default Football;