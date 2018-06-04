/*
* Author : Malik Fleury
* Date :  25.04.2018
* Description : Entry point of the program
*/

var scene = null;

// OnLoad Event
window.onload = function()
{
  load();
}

// Loading of all the stuff needed to render the simulation
function load()
{
    let graphicsCanvas = document.getElementById('GraphicsCanvas');

    // Check if canvas is ok
    if(!graphicsCanvas)
    {
      alert('Unable to get the canvas !');
      return;
    }

    let context = graphicsCanvas.getContext('2d');

    // Check if the context is ok
    if(!context)
    {
      alert('Unable to get the context !');
      return;
    }

    // Create a scene in which each shape are handled
    scene = new Scene(context);
    scene.addShape(new Square(new Vector2D(200, 0), 'black', 'red', 100));
    scene.addShape(new Square(new Vector2D(400, 100), 'blue', 'red', 50));
    scene.addShape(new HorizontalLine(new Vector2D(0, 400), 'black', 'black', graphicsCanvas.width, 3));

    // Add an event to update the scene every X ms
    window.setInterval(function()
    {
       context.clearRect(0, 0, graphicsCanvas.width, graphicsCanvas.height);
       scene.update();
    }, 25);
}
