/*
  Write a function arrayToList that builds up a list structure like the one shown when given [1, 2, 3] as argument. Also write a listToArray function that produces an array from a list. Then add a helper function prepend, which takes an element and a list and creates a new list that adds the element to the front of the input list, and nth, which takes a list and a number and returns the element at the given position in the list (with zero referring to the first element) or undefined when there is no such element.

If you haven’t already, also write a recursive version of nth.
*/

function arrayToList(baseArray) {
  function setItem(index) {
    if (index >= baseArray.length) {
      return null;
    }

    const list = {};
    list.value = baseArray[index];
    list.rest = setItem(index + 1);

    return list;
  }

  return setItem(0);
}

function listToArray(baseList) {
  const newArray = [];
  function setItem(currentObject) {
    newArray.push(currentObject.value);
    if (currentObject.rest) {
      setItem(currentObject.rest);
    }
  }

  setItem(baseList);
  return newArray;
}

function prepend(newValue, baseList) {
  return { value: newValue, rest: baseList };
}

function nth(baseList, desiredPosition) {
  let objectiveValue = null;
  function searchValue(currentObject, currentIndex) {
    if (currentIndex === desiredPosition) {
      objectiveValue = currentObject.value;
    } else {
      if (currentObject.rest) {
        searchValue(currentObject.rest, currentIndex + 1);
      } else {
        return null;
      }
    }
  }

  searchValue(baseList, 0);
  return objectiveValue;
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray({ value: 10, rest: { value: 20, rest: null } }));
// → [10, 20]
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
console.log(nth(arrayToList([10, 20, 30]), 20));
// → null
