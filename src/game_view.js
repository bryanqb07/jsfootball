class GameView{
    constructor(game, ctx){
        this.game = game;
        this.ctx = ctx;
    }

    // bindKeyHandlers(){
    //     key('a', () => this.game.
    // }

    moveDraw(){
        this.game.draw(this.ctx);
        this.game.move();
    }

    start(){
        // this.bindKeyHandlers();
        setInterval(this.moveDraw.bind(this), 250);
    }

}

export default GameView;