/*
  Write a function that computes the dominant writing direction in a string of text. Remember that each script object has a direction property that can be "ltr" (left to right), "rtl" (right to left), or "ttb" (top to bottom).

  The dominant direction is the direction of a majority of the characters that have a script associated with them. The characterScript and countBy functions defined earlier in the chapter are probably useful here.
*/

const SCRIPTS = require("./scripts.js");

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    ) {
      return script;
    }
  }
  return null;
}

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let direction = groupName(item);
    let known = counts.findIndex((c) => c.direction == direction);
    if (known === -1) {
      counts.push({ direction, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

function getDirection(char) {
  let script = characterScript(char.codePointAt(0));
  return script ? script.direction : "none";
}

function dominantDirection(text) {
  let directions = countBy(text, getDirection).filter(
    (direction) => direction !== "none"
  );

  let dominant = directions.reduce((currentDominant, direction) => {
    if (direction.count > currentDominant.count) {
      return direction;
    } else {
      return currentDominant;
    }
  });

  return dominant.direction;
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
