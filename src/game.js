import Football from './football';
import OffensiveLineman from './olineman';
import Quarterback from './quarterback';
import Receiver from './receiver';
import Utils from './utils';
import DefensiveBack from './defensive_back';

class Game{
    constructor(width, height){
        this.DIM_X = width;
        this.DIM_Y = height;
        // this.START_POS = [300, 250];
        this.los_x = 650; // los = line of scrimmage
        this.los_y = 450;
        this.center = new OffensiveLineman({ pos: [this.los_x, this.los_y]});
        this.quarterback = new Quarterback({ pos: [this.los_x, this.los_y + 200], speed: 10 });
        this.football = new Football({pos: [this.los_x, this.los_y], vel: [0, 50]})
        this.receivers = {
            "a": new Receiver({ pos: [this.los_x - 600, this.los_y], route: "slant", speed: 15, mirror: 1}),
            "s": new Receiver({ pos: [this.los_x - 400, this.los_y], route: "post", speed: 25, mirror: 1}),
            "d": new Receiver({ pos: [this.los_x + 400, this.los_y], route: "go", speed: 10, mirror: -1}),
            "f": new Receiver({ pos: [this.los_x + 600, this.los_y], route: "curl", speed: 15, mirror: -1})
        };
        this.defensive_backs = [
            new DefensiveBack({ pos: [this.los_x - 600, this.los_y - 100], radius: 20, 
                coverage: "man", speed: 25, target: this.receivers["a"], football: this.football })
        ];
        this.skillPlayers = [this.quarterback, ...Object.values(this.receivers), ...this.defensive_backs];
        this.allObjects = [this.center, this.quarterback, ...Object.values(this.receivers), ...this.defensive_backs, this.football];
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

        this.defensive_backs.forEach(db => {
            if (Utils.inArea(db.options.pos, this.football.options.pos, db.options.radius)){
                this.football.options.vel = receiver.options.vel;
                this.buttonPressed = null;
            }
        });
    }

    findBallCarrier(){
        let ballCarrier = null
        this.skillPlayers.forEach(player => {
            if(Utils.arrEqual(player.options.pos, this.football.options.pos)){
                ballCarrier = player;
            }
        });
        return ballCarrier;
    }

    draw(ctx){
        ctx.clearRect(0, 0, this.DIM_X * 2, this.DIM_Y * 2);
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
                obj.move(this.buttonPressed);
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
            this.football.options.vel = Utils.changeVelocity(target_receiver, this.football, 0);
        }
    }
}

export default Game;