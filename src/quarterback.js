import Player from './player';

class Quarterback extends Player{
    constructor(options){
        super(options);
        this.options.color = "#00FF00";
        this.options.canPass = true;
    }
}

export default Quarterback;