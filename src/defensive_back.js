import DefensivePlayer from './defensive_player';
import Utils from './utils';

class DefensiveBack extends DefensivePlayer {
    constructor(options) {
        super(options);
    }

    move(buttonPressed){
        const targetReceiver = this.options.target;
        if(buttonPressed){ // ball is in the air
            this.options.vel = Utils.changeVelocity(targetReceiver, this, 100); 
        }else{ // in man coverage
            const receiverXDir = targetReceiver.options.vel[0] / targetReceiver.options.speed;
            const receiverYDir = targetReceiver.options.vel[1] / targetReceiver.options.speed;
            this.options.vel = [receiverXDir * this.options.speed, receiverYDir * this.options.speed];
        }

        this.options.pos[0] += this.options.vel[0];
        this.options.pos[1] += this.options.vel[1];
    }

}

export default DefensiveBack;