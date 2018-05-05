/*
* Author : Malik Fleury
* Date :  25.04.2018
* Description : This script describes the graphics of the square.
*               These tools are used for the drawing
*/

class Shape
{
   constructor(x, y, penColor, bucketColor)
   {
      this.x = x;
      this.y = y;
      this.penColor = penColor;
      this.bucketColor = bucketColor;
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

   setBucketColor(bucketColor)
   {
      this.bucketColor = bucketColor;
   }

   setPos(x, y)
   {
      this.x = x;
      this.y = y;
   }

   move(x, y)
   {
      this.x += x;
      this.y += y;
   }

   draw(context)
   {
      // Nothing...
   }
}

class Square extends Shape
{
   constructor(x, y, penColor, bucketColor, sideSize)
   {
      super(x, y, penColor, bucketColor);
      this.sideSize = sideSize;
   }

   draw(context)
   {
      context.strokeStyle = this.penColor;
      context.fillStyle = this.bucketColor;

      context.translate(this.x, this.y);
      context.rotate(0);

      context.fillRect(0, 0, this.sideSize, this.sideSize);
      context.strokeRect(0, 0, this.sideSize, this.sideSize);

      context.rotate(0);      // TODO : Undo the rotation
      context.translate(-this.x, -this.y);
   }
}
