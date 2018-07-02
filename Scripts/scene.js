/*
* Author : Malik Fleury
* Date :  17.06.2018
* Description : the scene stores all the attributes needed for the simulation and updates them.
*/

class Scene
{
    constructor(graphicsCanvas, initalVelocity, gravity, restitutionFactor, divPlot = "graph")
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

        // Used for error correction
        this.lastHeighestPos = 0;
        this.epsilon = 0.1;

        // Plot
        this.totTime = 0;
        this.divPlot = divPlot;
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
        if(this.ball.getY() < this.lastHeighestPos )
        {
            //&& this.ball.getY() < this.graphicsCanvas.height
            this.ball.setY(this.lastHeighestPos);
            this.vy = 0;
        }

        // Get the height when velocity is 0
        if(equals(this.vy, 0, 10/16))
        {
            this.lastHeighestPos = this.ball.getY();
        }
    
        // Can enable or disable the plot, it can slow the simulation if enabled
        if(this.enabledPlot)
        {
            // Add data to trace
            Plotly.relayout(this.divPlot, 'xaxis.range', [0, this.totTime]);
            Plotly.extendTraces(this.divPlot, {x: [[this.totTime]], y: [[this.graphicsCanvas.height-this.ball.getY()-this.ball.getHeight()]]}, [0]);
            this.totTime += this.dt;
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

        this.lastHeighestPos = 0;

        this.enabledPlot = false;
        Plotly.purge(this.divPlot);
    }

	// Clear the context
    clearCanvas()
    {
        this.context.clearRect(0, 0, this.graphicsCanvas.width, this.graphicsCanvas.height);
    }

    // Plot
    displayPlot()
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

        Plotly.newPlot(this.divPlot, plotData, layout);
        this.totTime = 0;

        this.enabledPlot = true;
    }
}