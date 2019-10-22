import Player from './player';

class OffensivePlayer extends Player{
    constructor(options){
        super(options);
        this.options.color = "#00FF00";
    }
}

export default OffensivePlayer;