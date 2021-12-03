/*
  Write a function countBs that takes a string as its only argument and returns a number that indicates how many uppercase “B” characters there are in the string.

  Next, write a function called countChar that behaves like countBs, except it takes a second argument that indicates the character that is to be counted (rather than counting only uppercase “B” characters). Rewrite countBs to make use of this new function.
*/

const countBs = (string) => {
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === 'B') {
      count++;
    }
  }
  return count;
};

const countChar = (string, char) => {
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === char) {
      count++;
    }
  }
  return count;
};

const countBs = (string) => {
  return countChar(string, 'B');
}

console.log(countBs('BBC'));
console.log(countChar('kakkerlak', 'k'));
