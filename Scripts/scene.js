/*
* Author : Malik Fleury
* Date :  17.06.2018
* Description : the scene stores all the attributes needed for the simulation and updates them.
*/

class Scene
{
    constructor(graphicsCanvas, initalVelocity, gravity, restitutionFactor)
    {
		// Stores the canvas HTML5 and the context for drawing
        this.graphicsCanvas = graphicsCanvas;
        this.context = graphicsCanvas.getContext('2d');

		// Data about the simulation
        this.ball = new Ball(graphicsCanvas.width/2-25, 0, 50);
        this.vy = initalVelocity;
        this.gravity = gravity;
        this.restitutionFactor = restitutionFactor;

		// Time between 2 calls of the update
        this.lastUpdateMs = Date.now();
        this.dt = 0;
    }

	// Update the ball
    update()
    {
        // Compute the delta time (second)
        this.dt = (Date.now() - this.lastUpdateMs)/1000;
        this.lastUpdateMs = Date.now();
        
        this.clearCanvas();
        this.ball.draw(this.context);

        this.ball.moveY(this.vy);           // Add last velocity to position
        this.vy += this.gravity * this.dt;  // Computes next velocity

		// If there's a collision with the ground, the ball is repositionned at the good position
		// and the coefficient of restitution is used to simulate elastic/inelastic collision.
        if(this.ball.getY() + this.ball.getHeight() > this.graphicsCanvas.height)
        {
            this.ball.setY(this.graphicsCanvas.height - this.ball.getHeight());
            this.vy *= -this.restitutionFactor;		// Velocity is in the opposite side (upward)
        }
    }

	// Reset the scene, restart the simulation
    reset(initialVelocity, gravity, restitutionFactor)
    {
        this.vy = initialVelocity;
        this.gravity = gravity;
        this.restitutionFactor = restitutionFactor;
        this.ball.setY(0);

        this.lastUpdateMs = Date.now();
        this.dt = 0;
    }

	// Clear the context
    clearCanvas()
    {
        this.context.clearRect(0, 0, this.graphicsCanvas.width, this.graphicsCanvas.height);
    }
}