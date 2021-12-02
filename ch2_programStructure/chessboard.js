/*
  Write a program that creates a string that represents an 8×8 grid, using newline characters to separate lines. At each position of the grid there is either a space or a "#" character. The characters should form a chessboard.

  Passing this string to console.log should show something like this:

  # # # #
  # # # # 
  # # # #
  # # # # 
  # # # #
  # # # # 
  # # # #
  # # # #

  When you have a program that generates this pattern, define a binding size = 8 and change the program so that it works for any size, outputting a grid of the given width and height.
*/

const size = 20;
let board = '';
const hash = '#';
const space = ' ';
const newline = '\n';
let oddRow = true;

for (let i = 0; i < size ** 2; i++) {
  if (i % 2 === 0) {
    if (oddRow) {
      board += space;
    } else {
      board += hash;
    }
  } else {
    if (oddRow) {
      board += hash;
    } else {
      board += space;
    }
  }

  if (i % size === 0) {
    board += newline;
    oddRow = !oddRow;
  }
}

console.log(board);
