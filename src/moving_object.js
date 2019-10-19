class MovingObject{
    constructor(options){
        this.options = options;
    }

    collideWith(otherObject){}

    draw (ctx) {
        ctx.beginPath();
        ctx.arc(this.options.pos[0], this.options.pos[1], this.options.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.options.color;
        ctx.fill();
    }

    isCollidedWith(otherObject){
        const dx = this.options.pos[0] - this.options.otherObject.pos[0];
        const dy = this.options.pos[1] - this.options.otherObject.pos[1];
        const distance = Math.sqrt(dx * dx + dy * dy);

        return (distance < this.options.radius + otherObject.options.radius);
    }

    move() {
        this.options.pos[0] += this.options.vel[0];
        this.options.pos[1] += this.options.vel[1];
    }
    
}
export default MovingObject;