/*
  Here’s another way to define whether a positive whole number is even or odd:

    Zero is even.

    One is odd.

    For any other number N, its evenness is the same as N - 2.

Define a recursive function isEven corresponding to this description. The function should accept a single parameter (a positive, whole number) and return a Boolean.

Test it on 50 and 75. See how it behaves on -1. Why? Can you think of a way to fix this?
*/

const isEven = (number) => {
  if (number === 0) {
    return true;
  } else if (number === 1) {
    return false;
  } else {
    if (number > 0) {
      return isEven(number - 2);
    } else {
      return isEven(number + 2);
    }
  }
};

console.log('50:', isEven(50));
console.log('75:', isEven(75));
console.log('-1:', isEven(-1));
console.log('-10:', isEven(-10));
