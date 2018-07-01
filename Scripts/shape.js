/*
* Author : Malik Fleury
* Date :  25.04.2018
* Description : This script describes the graphics of shapes
*               These tools are used for the drawing
*/

class Shape
{
   constructor(x, y , width, height)
   {
       this.x = x;
       this.y = y;
       this.width = width;
       this.height = height;
   }

   getX()
   {
       return this.x;
   }

   setX(x)
   {
       this.x = x;
   }

   getY()
   {
       return this.y;
   }

   setY(y)
   {
       this.y = y;
   }

   getHeight()
   {
       return this.height;
   }

   getWidth()
   {
       return this.width;
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

   move(x, y)
   {
       this.x += x;
       this.y += y;
   }

   moveY(y)
   {
       this.y += y;
   }

   draw(context)
   {
       // Nothing
       // Drawing is done in specialized classes
   }
}

class Ball extends Shape
{
    constructor(x, y, radius)
    {
        super(x, y , radius, radius);
    }
    
    draw(context)
    {
        context.translate(this.x + this.width/2, this.y + this.width/2);
		
        context.beginPath();
        context.arc(0, 0, this.width/2, 0, 2*Math.PI);
        context.stroke();
        context.closePath();
		
        context.translate(-(this.x + this.width/2), -(this.y + this.width/2));
    }
}