import OffensivePlayer from './offensive_player';

class Quarterback extends OffensivePlayer{
    constructor(options){
        super(options);
        this.options.vel = [0,0] // pre-snap
        this.options.canPass = true;
    }
}

export default Quarterback;