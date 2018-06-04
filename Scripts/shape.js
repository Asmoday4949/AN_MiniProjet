/*
* Author : Malik Fleury
* Date :  25.04.2018
* Description : This script describes the graphics of the square.
*               These tools are used for the drawing
*/

class Shape
{
   constructor(position, penColor, bucketColor, minCollision, maxCollision)
   {
      this.position = position;
      this.penColor = penColor;
      this.bucketColor = bucketColor;
      this.aabb = new AABB(minCollision, maxCollision);
   }

   getPenColor()
   {
      return this.penColor;
   }

   setPenColor(penColor)
   {
      this.penColor = penColor;
   }

   getBucketColor()
   {
      return this.bucketColor;
   }

   getPos()
   {
      return this.position;
   }

   setBucketColor(bucketColor)
   {
      this.bucketColor = bucketColor;
   }

   setPos(position)
   {
      this.position = position;
   }

   move(moveVec)
   {
      this.position.add(moveVec);
   }

   getAABB()
   {
      return this.aabb;
   }

   draw(context)
   {
      // Nothing
      // Drawing is done in specialized classes
   }

   isColliding(shape)
   {
       // Test collision between this shape and an other passed in argument
       return this.aabb.collide(this.aabb, shape.getAABB());
   }
}

class Square extends Shape
{
   constructor(position, penColor, bucketColor, sideSize)
   {
      super(position, penColor, bucketColor, new Vector2D(0, 0), new Vector2D(1, 1));
      this.sideSize = sideSize;
   }

   draw(context)
   {
      context.strokeStyle = this.penColor;
      context.fillStyle = this.bucketColor;

      context.translate(this.position.getX(), this.position.getY());
      context.rotate(0);

      context.fillRect(0, 0, this.sideSize, this.sideSize);
      context.strokeRect(0, 0, this.sideSize, this.sideSize);

      context.rotate(0);      // TODO : Undo the rotation
      context.translate(-this.position.getX(), -this.position.getY());
   }
}

class HorizontalLine extends Shape
{
    constructor(position, penColor, bucketColor, length, width)
    {
        super(position, penColor, bucketColor, new Vector2D(0, 0), new Vector2D(1, 1));
        this.width = width;
        this.length = length;
    }

    draw(context)
    {
        context.strokeStyle = this.penColor;
        context.fillStyle = this.bucketColor;

        context.translate(this.position.getX(), this.position.getY());
        context.rotate(0);

        context.fillRect(0, 0, this.length, this.width);
        context.strokeRect(0, 0, this.length, this.width);

        context.rotate(0);      // TODO : Undo the rotation
        context.translate(-this.position.getX(), -this.position.getY());
    }
}
