import Football from './football';
import OffensiveLineman from './olineman';
import Quarterback from './quarterback';
import Receiver from './receiver';
import Utils from './utils';

class Game{
    constructor(width, height){
        this.DIM_X = width;
        this.DIM_Y = height;
        // this.START_POS = [300, 250];
        this.los_x = 600; // los = line of scrimmage
        this.los_y = 450;
        this.center = new OffensiveLineman({ pos: [this.los_x, this.los_y], vel: [0, 0], radius: 20, color: "#00FF00" });
        this.quarterback = new Quarterback({ pos: [this.los_x, this.los_y + 200], vel: [0, 0], radius: 20, color: "#00FF00", speed: 10 });
        // this.receiver1 = new Receiver({ pos: [this.los_x - 400, this.los_y], radius: 20, color: "#00FF00", route: "slant", speed: 15, button: "a" });
        this.football = new Football({pos: [this.los_x, this.los_y], vel: [0, 50]})
        this.receivers = {
            "a": new Receiver({ pos: [this.los_x - 400, this.los_y], radius: 20, color: "#00FF00", route: "slant", speed: 15, mirror: 1}),
            "s": new Receiver({ pos: [this.los_x - 300, this.los_y], radius: 20, color: "#00FF00", route: "slant", speed: 25, mirror: 1}),
            "d": new Receiver({ pos: [this.los_x + 300, this.los_y], radius: 20, color: "#00FF00", route: "slant", speed: 10, mirror: -1}),
            "f": new Receiver({ pos: [this.los_x + 400, this.los_y], radius: 20, color: "#00FF00", route: "slant", speed: 15, mirror: -1})
        };
        this.skillPlayers = [this.quarterback, ...Object.values(this.receivers)];
        this.allObjects = [this.center, this.quarterback, ...Object.values(this.receivers), this.football];
        this.presnap = true; // ball not snapped to begin game
        this.yardline = 30;
        this.buttonPressed = null;
        // this.ballCarrier = null;
    }

    catchCheck(){
        Object.keys(this.receivers).forEach(key => {
            let receiver = this.receivers[key];
            if (Utils.arrEqual(receiver.options.pos, this.football.options.pos) && this.buttonPressed == key){
                this.football.options.vel = receiver.options.vel;
                this.buttonPressed = null;
            }
        });
    }

    findBallCarrier(){
        let ballCarrier = null
        this.skillPlayers.forEach(player => {
            if(player.options.pos[1] == this.football.options.pos[1]){
                ballCarrier = player;
            }
        });
        return ballCarrier;
    }

    draw(ctx){
        ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
        this.allObjects.forEach(obj => {
            obj.draw(ctx);
        })
    }

    move(){
        if(this.presnap){
            this.football.move();
            this.presnap = !(this.football.options.pos[1] == this.quarterback.options.pos[1])
            if (!this.presnap){
                this.football.options.vel = [0, 0];
            }
        }else {
            this.catchCheck();
            this.allObjects.forEach(obj => {
                obj.move();
            })
        }
    }

    moveBallCarrier(dir){
        const ballCarrier = this.findBallCarrier();

        if(ballCarrier){
            const direction = Utils.DIRS[dir];
            const speed = ballCarrier.options.speed
            ballCarrier.options.vel[0] = speed * direction[0];
            ballCarrier.options.vel[1] = speed * direction[1];
            this.football.options.vel[0] = speed * direction[0];
            this.football.options.vel[1] = speed * direction[1];
        }
    }

    passBall(button){
        const ballCarrier = this.findBallCarrier();
        if (!ballCarrier){return;}
        if(ballCarrier.options.canPass){
            const target_receiver = this.receivers[button];
            this.buttonPressed = button;
            this.football.options.vel = Utils.calculateFootBallVelocity(target_receiver, this.football);
        }
    }
}

export default Game;