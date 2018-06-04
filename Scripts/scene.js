/*
* Author : Malik Fleury
* Date :  25.04.2018
* Description : The scene handle all the shapes attached with it
*/

class Scene
{
  constructor(context)
  {
    this.context = context;
    this.shapesList = [];
    this.lastTimeMs = Date.now();
    this.timeAtStart = this.lastTimeMs;

    this.PIXEL_TO_METER_FACTOR = 10;  // One pixel is 10 meter
  }

  addShape(shape)
  {
    this.shapesList.push(shape);
  }

  update()
  {
    let currentTimeMs = Date.now();
    let delta = currentTimeMs - this.lastTimeMs;

    for(let i = 0;i < this.shapesList.length; i++)
    {
      let shape = this.shapesList[i];

      let timeFromStart = currentTimeMs - this.timeAtStart;
      let y = Math.simpleRectangleMethod(Physic.computeVelocity, timeFromStart / 1000, 0.001);

	   //let collision = this.collide(shape);

      if(i == 0)
      {
         shape.getPos().setY(y * this.PIXEL_TO_METER_FACTOR);
      }

      shape.draw(this.context);
    }

    this.lastTimeMs = currentTimeMs;
  }

  collide(shape)
  {
	  let result = false;

	  for(let i = 0;i < this.shapesList.length; i++)
	  {
		  let currentShape = this.shapesList[i];

		  result = (currentShape != shape) && (shape.isColliding(currentShape));
	  }

	  return result;
  }
}
