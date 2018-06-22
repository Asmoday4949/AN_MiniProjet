
class Scene
{
    constructor(graphicsCanvas, initalVelocity, gravity, restitutionFactor)
    {
        this.graphicsCanvas = graphicsCanvas;
        this.context = graphicsCanvas.getContext('2d');

        this.ball = new Ball(100, 0, 50);
        this.vy = initalVelocity;
        this.gravity = gravity;
        this.restitutionFactor = restitutionFactor;

        this.lastUpdateMs = Date.now();
        this.dt = 0;
    }

    update()
    {
        // Compute the delta time (second)
        this.dt = (Date.now() - this.lastUpdateMs)/1000;
        this.lastUpdateMs = Date.now();
        
        this.clearCanvas();
        this.ball.draw(this.context);

        this.ball.moveY(this.vy);
        this.vy += this.gravity * this.dt;

        //console.log(this.ball);

        if(this.ball.getY() + this.ball.getHeight() > this.graphicsCanvas.height)
        {
            this.ball.setY(this.graphicsCanvas.height - this.ball.getHeight());
            this.vy *= -this.restitutionFactor;
        }
    }

    reset(initialVelocity, gravity, restitutionFactor)
    {
        this.vy = initialVelocity;
        this.gravity = gravity;
        this.restitutionFactor = restitutionFactor;
        this.ball.setY(0);

        this.lastUpdateMs = Date.now();
        this.dt = 0;
    }

    clearCanvas()
    {
        this.context.clearRect(0, 0, this.graphicsCanvas.width, this.graphicsCanvas.height);
    }
}