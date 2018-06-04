/*
* Author : Malik Fleury
* Date :  25.04.2018
* Description : Math stuff
*/

class Vector2D
{
   constructor(x, y)
   {
      this.x = x;
      this.y = y;
   }

   getX()
   {
      return this.x;
   }

   getY()
   {
      return this.y;
   }

   setX(x)
   {
      this.x = x;
   }

   setY(y)
   {
      this.y = y;
   }

   // Add two vector2D and create a new Vector2D with the result
   add(vector2)
   {
      return new Vector2D(this.x + vector2.x, this.y + vector2.y);
   }

   // Compute the determinant between two vector2D
   static determinant(vector2A, vector2B)
   {
      return vector2A.y * vector2B.x - vector2A.y * vector2B.x;
   }
}

class Math
{
   // Method with rectangles, the simplest function
   static simpleRectangleMethod(f, x, dx)
   {
      let iterations = parseInt(x/dx);    // Compute the number of iterations
      let v0 = 0;                         // Initial velocity (by default 0)
      let result = 0;

      for(let i = 0;i < iterations; i++)
      {
         result += dx * f(v0, -Physic.EARTH_ACC, i * dx);
      }

      return result;
   }

   /*
   static middlePointMethod(func, x, h, n)
   {
   let result = 0;

   for(let i = 0;i < n; i++)
   {
   result += h * func(0, -9.81, (2*i - h)/2);
}

return result;
}
*/
}
