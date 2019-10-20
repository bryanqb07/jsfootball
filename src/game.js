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
        this.los_y = 250;
        this.center = new OffensiveLineman({ pos: [this.los_x, this.los_y], vel: [0, 0], radius: 20, color: "#00FF00" });
        this.quarterback = new Quarterback({ pos: [this.los_x, this.los_y + 200], vel: [0, 0], radius: 20, color: "#00FF00", speed: 10 });
        this.receiver1 = new Receiver({ pos: [this.los_x - 400, this.los_y], radius: 20, color: "#00FF00", route: "curl", speed: 15, button: "a" });
        this.football = new Football({pos: [this.los_x, this.los_y], vel: [0, 50]})
        this.receivers = [this.receiver1];
        this.skillPlayers = [this.quarterback, this.receiver1];
        this.allObjects = [this.center, this.quarterback, this.receiver1, this.football];
        this.presnap = true; // ball not snapped to begin game
        this.yardline = 30;
        // this.ballCarrier = null;
    }

    catchCheck(){
        if (this.receivers.some((receiver) => Utils.arrEqual(receiver.options.pos, this.football.options.pos))){
            this.football.options.vel = [0, 0]
        } 
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
        console.log(this.ballCarrier);
        console.log(this.quarterback.options.pos);
        console.log(this.football.options.pos);
        if(ballCarrier){
            const direction = Utils.DIRS[dir];
            const speed = ballCarrier.options.speed
            this.football.options.pos[0] += speed * direction[0];
            this.football.options.pos[1] += speed * direction[1];
            ballCarrier.options.pos[0] += speed * direction[0];
            ballCarrier.options.pos[1] += speed * direction[1];
        }
    }

    passBall(target_receiver){
        const ballCarrier = this.findBallCarrier();
        if (!ballCarrier){
            return;
        }
        target_receiver = this.receiver1;
        if(ballCarrier.options.canPass){
            // console.log(Utils.targetReceiverPosition(10, target_receiver));
            this.football.options.vel = Utils.calculateFootBallVelocity(this.receiver1, this.football);
            // this.football.options.vel = Utils.calculateFootballVelocity(target_receiver, this.football)
        }
    }
}

export default Game;