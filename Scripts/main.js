/*
* Author : Malik Fleury
* Date :  25.04.2018
* Description : Entry point of the program
*/

let intervalId;
let scene = null;

// OnLoad Event
window.onload = function()
{
    let graphicsCanvas = document.getElementById('GraphicsCanvas');
    let context = graphicsCanvas.getContext('2d');

    // Check if canvas is ok
    if(!graphicsCanvas)
    {
      alert('Unable to get the canvas !');
      return;
    }

    // Check if the context is ok
    if(!context)
    {
      alert('Unable to get the context !');
      return;
    }

    scene = new Scene(graphicsCanvas, 0, 9.81, 0.5);

    scene.displayPlot("graph");

    // Add an event to update the scene every X ms
    intervalId = window.setInterval(function()
    {
      if(scene != null)
      {
        scene.update();
      }
    }, 1000/30);  // 60 fps
}

// Reset the scene, the simulation restart
function resetScene()
{
  let height = parseFloat(document.getElementById("CanvasHeight").value);
  let velocity = parseFloat(document.getElementById("InitialVelocity").value);
  let restitutionFactor = parseFloat(document.getElementById("RestitutionFactor").value);
  let gravity = parseFloat(document.getElementById("Gravity").value);
  let graphicsCanvas = document.getElementById('GraphicsCanvas');

  graphicsCanvas.height = height;

  scene.reset(velocity, gravity, restitutionFactor);
  scene.displayPlot("graph");
}

function updateGravity(gravity)
{
  document.getElementById("Gravity").value = gravity.toString();
}