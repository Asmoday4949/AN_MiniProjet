/*
* Author : Malik Fleury
* Date :  25.04.2018
* Description : This script can simulate the physic of a square under the gravity.
*/

// AABB Box ?
// AB Box ?
// OBB

class Physic
{
   static computeVelocity(v0, acc, t)
   {
      return v0 - acc * t;
   }
}
