import Player from './player';

class OffensiveLineman extends Player{
    constructor(options){
        super(options);
        this.options.color = "#00FF00";
    }
}

export default OffensiveLineman;