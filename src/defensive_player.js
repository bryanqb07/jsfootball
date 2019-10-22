import Player from './player';

class DefensivePlayer extends Player {
    constructor(options) {
        super(options);
        this.options.color = "#ffa500";
    }
}

export default DefensivePlayer;