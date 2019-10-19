import Football from './football';
import Player from './player';

class Game{
    constructor(width, height){
        this.DIM_X = width;
        this.DIM_Y = height;
        // this.START_POS = [300, 250];
        this.center = new Player({ pos: [300, 250], vel: [10, 10], radius: 20, color: "#00FF00" });
        this.quarterback = new Player({ pos: [300, 550], vel: [10, 10], radius: 20, color: "#00FF00" });
        this.football = new Football({pos: [300, 250], vel: [0, 50]})
        this.presnap = true;
        this.allObjects = [this.center, this.quarterback, this.football];
    }

    draw(ctx){
        ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
        this.allObjects.forEach(obj => {
            obj.draw(ctx);
        })
    }

    move(){
        if(this.presnap){
            console.log(this.football.options.pos);
            console.log(this.center.options.pos);
            this.football.move();
            this.presnap = !(this.football.options.pos[1] == this.quarterback.options.pos[1])
        }else {
            // console.log(this.presnap);
            console.log("snapped");
            // console.log(this.quarterback.options.pos);
            // console.log(this.football.options.pos);
            // console.log(this.football.options.pos[1] == this.quarterback.options.pos[1])
            // this.allObjects.forEach(obj => {
            //     obj.move();
            // })
        }
    }

}

export default Game;