class GameView{
    constructor(game, ctx){
        this.game = game;
        this.ctx = ctx;
        this.started = false;
    }

    bindKeyHandlers() {
        key('space', () => setInterval(this.moveDraw.bind(this), 250))
        key('up', () => this.game.moveBallCarrier("N"))
        key('down', () => this.game.moveBallCarrier("S"))
        key('left', () => this.game.moveBallCarrier("W"))
        key('right', () => this.game.moveBallCarrier("E"))
        key('a', () => this.game.passBall("A"))
    }

    moveDraw(){
        this.game.draw(this.ctx);
        this.game.move();
    }

    start(){
        this.bindKeyHandlers();
        this.game.draw(this.ctx);        
    }

}

export default GameView;