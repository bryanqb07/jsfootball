import MovingObject from './moving_object';
import Football from './football';
import Game from './game';
import GameView from './game_view';

document.addEventListener("DOMContentLoaded", (e) => {
    const canvas = document.getElementById("game-canvas");
    canvas.height = 780;
    canvas.width = 1400;
    const ctx = canvas.getContext("2d");
    // MovingObject test
    // const test = new MovingObject({ pos: [30, 30], vel: [10, 10],radius: 20, color: "#00FF00" });
    // test.draw(ctx);
    // test.move();
    // test.draw(ctx);
    // const football = new Football({ pos: [50, 50], vel: [10, 10], radius: 5 })
    // football.draw(ctx);
    //
    const testGame = new Game(canvas.height, canvas.width);
    const testGameView = new GameView(testGame, ctx);
    testGameView.start();
});