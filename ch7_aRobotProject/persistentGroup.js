/* 
  Write a new class PGroup, similar to the Group class from Chapter 6, which stores a set of values. Like Group, it has add, delete, and has methods.

  Its add method, however, should return a new PGroup instance with the given member added and leave the old one unchanged. Similarly, delete creates a new instance without a given member.

  The class should work for values of any type, not just strings. It does not have to be efficient when used with large amounts of values.

  The constructor shouldn’t be part of the class’s interface (though you’ll definitely want to use it internally). Instead, there is an empty instance, PGroup.empty, that can be used as a starting value.

  Why do you need only one PGroup.empty value, rather than having a function that creates a new, empty map every time?
*/

class PGroup {
  constructor(entries = []) {
    this.entries = entries;
  }

  add(value) {
    if (!this.has(value)) {
      const newEntries = [...this.entries, value];
      return new PGroup(newEntries);
    }
  }

  delete(value) {
    if (this.has(value)) {
      const newEntries = this.entries.filter((entry) => entry !== value);
      return new PGroup(newEntries);
    }
  }

  has(value) {
    return this.entries.includes(value);
  }
}

PGroup.empty = new PGroup();

let a = PGroup.empty.add('a');
let ab = a.add('b');
let b = ab.delete('a');

console.log(b.has('b'));
// → true
console.log(a.has('b'));
// → false
console.log(b.has('a'));
// → false
