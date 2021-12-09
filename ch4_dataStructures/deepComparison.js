/*
  Write a function deepEqual that takes two values and returns true only if they are the same value or are objects with the same properties, where the values of the properties are equal when compared with a recursive call to deepEqual.
*/

function deepEqual(element1, element2) {
  if (element1 === element2) {
    return true;
  } else {
    if (typeof element1 !== 'object') {
      return false;
    } else if (element1 === null || element2 === null) {
      return false;
    } else {
      let comparison = true;

      for (let property in element1) {
        comparison = deepEqual(element1[property], element2[property]);
        if (!comparison) {
          return comparison;
        }
      }

      for (property in element2) {
        comparison = deepEqual(element1[property], element2[property]);
        if (!comparison) {
          return comparison;
        }
      }

      return comparison;
    }
  }
}

let obj = { here: { is: 'an' }, object: 2 };
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false
console.log(deepEqual(obj, { here: { is: 'an' }, object: 2 }));
// → true
console.log(deepEqual(obj, null));
// → true
console.log(deepEqual(obj, { here: { is: 'an' }, object: 2, finish: false }));
// → false
