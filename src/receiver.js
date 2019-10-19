import Player from './player';
import Utils from './utils';


class Receiver extends Player{
    constructor(options){
        super(options);
        this.options.color = "#00FF00";
        this.options.vel = [0, -this.options.speed];
        this.routes = {
            slant: [ 200, Utils.DIRS.NE ],
            go: [],
            post: [ 1000, Utils.DIRS.N, Utils.DIRS.N, Utils.DIRS.N, Utils.DIRS.N, Utils.DIRS.NE ],
            curl: [ 800, Utils.DIRS.STOP]
        }
        this.route_step = 0;
        this.distance_traveled = 0;
        this.selected_route = this.routes[this.options.route];
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.options.pos[0], this.options.pos[1], this.options.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.options.color;
        // ctx.font = '50px serif';
        ctx.fill();
        ctx.fillText = (this.options.button, this.options.pos[0], this.options.pos[1])
    }

    move(){
        if(this.route_step < this.selected_route.length){
            const next_step = this.selected_route[this.route_step]
            if(Array.isArray(next_step)){
                this.options.vel[0] = this.options.speed * this.selected_route[this.route_step][0]
                this.options.vel[1] = this.options.speed * this.selected_route[this.route_step][1]
                this.route_step++;
            }else{
                if(this.distance_traveled >= next_step){
                    this.route_step++;
                }
            }
        }
        this.options.pos[0] += this.options.vel[0]
        this.options.pos[1] += this.options.vel[1]
        this.distance_traveled += this.options.pos[1];
    }
}

export default Receiver;