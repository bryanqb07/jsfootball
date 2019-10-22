import OffensivePlayer from './offensive_player';

class OffensiveLineman extends OffensivePlayer{
    constructor(options){
        super(options);
        this.options.vel = [0,0]
    }
}

export default OffensiveLineman;