/*
* Author : Malik Fleury
* Date :  25.04.2018
* Description : tools
*/

function equals(a, b, epsilon)
{
    let result;

    if(a != 0 && b != 0)
    {
        result = Math.abs((a - b) / a) <= epsilon;
    }
    else
    {
        result = Math.abs(a-b) <= epsilon;
    }

    return result;
}