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

        // used for error correction
        this.lastHeighestPos = 0;
        this.epsilon = 1/16 * 10;

        // Total time for plot
        this.totTime = 0;
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

        // Check if this height has been already reached => correction
        if(this.ball.getY() < this.lastHeighestPos && this.ball.getY() > this.graphicsCanvas.height)
        {
            this.ball.setY(this.lastHeighestPos + this.epsilon);
            this.vy = 0;
        }

        // Get the height when velocity is 0
        if(this.vy <= this.epsilon && this.vy >= -this.epsilon)
        {
            this.lastHeighestPos = this.ball.getY();
        }
    
        // Specific to plot
        Plotly.relayout("graph", 'xaxis.range', [0, this.totTime]);
        Plotly.extendTraces("graph", {x: [[this.totTime]], y: [[this.graphicsCanvas.height-this.ball.getY()-this.ball.getHeight()]]}, [0]);
        this.totTime += this.dt;
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

        this.lastHeighestPos = 0;
    }

	// Clear the context
    clearCanvas()
    {
        this.context.clearRect(0, 0, this.graphicsCanvas.width, this.graphicsCanvas.height);
    }

    // Plot
    displayPlot(divPlot)
    {
        let layout =
        {    
            width: 400,
            height: 400,

            xaxis:
            {
                title: "t [s]",
                range: [0, 0],
                autorange: false
            },
            yaxis:
            {
                title: "position [px]",
                range: [0, this.graphicsCanvas.height],
                autorange: false
            },
            hovermode: "closest"
        };

        let xData = [];
        let yData = [];

        let plot =
        {
            name: 'f(x)',
            x: xData,
            y: yData,
            type: 'scatter'
        };

        let plotData = [];
        plotData.push(plot);

        Plotly.newPlot(divPlot, plotData, layout);
        this.totTime = 0;
    }
}