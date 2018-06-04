/*
* Author : Malik Fleury
* Date :  25.04.2018
* Description : This script can simulate the physic of a square under the gravity.
*/

class AABB
{
    constructor(min, max)
    {
        this.min = min;
        this.max = max;
    }

    setMin(min)
    {
        this.min = min;
    }

    setMax(max)
    {
        this.max = max;
    }

    getMin()
    {
        return this.min;
    }

    getMax()
    {
        return this.max;
    }

    collide(a, b)
    {
        if(a.getMax().x < b.getMin().x || a.getMin().x > b.getMax().x) return false;
        if(a.getMax().y < b.getMin().y || a.getMin().y > b.getMax().y) return false;

        console.log("Collision");

        return true;
    }
}

class Physic
{
   static computeVelocity(v0, acc, t)
   {
      return v0 - acc * t;
   }
}

// Constants of acceleration for different environnements
Physic.EARTH_ACC = 9.806;
Physic.MARS_ACC = 3,711;
Physic.MOON_ACC = 1,622;
