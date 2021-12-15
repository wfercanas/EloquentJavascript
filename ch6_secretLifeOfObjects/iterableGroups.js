/*
  Make the Group class from the previous exercise iterable. Refer to the section about the iterator interface earlier in the chapter if you aren’t clear on the exact form of the interface anymore.

  If you used an array to represent the group’s members, don’t just return the iterator created by calling the Symbol.iterator method on the array. That would work, but it defeats the purpose of this exercise.

  It is okay if your iterator behaves strangely when the group is modified during iteration.
*/

class Group {
  constructor() {
    this.entries = [];
  }

  add(value) {
    if (!this.entries.includes(value)) {
      this.entries.push(value);
    }
  }

  delete(value) {
    if (this.entries.includes(value)) {
      const index = this.entries.indexOf(value);
      this.entries.splice(index, 1);
    }
  }

  has(value) {
    return this.entries.includes(value);
  }

  get(index) {
    return this.entries[index];
  }

  static from(iterable) {
    const newGroup = new Group();
    for (let item of iterable) {
      newGroup.add(item);
    }
    return newGroup;
  }
}

class GroupIterator {
  constructor(group) {
    this.index = 0;
    this.group = group;
  }

  next() {
    if (this.index === this.group.entries.length) {
      return { done: true };
    }

    let value = this.group.get(this.index);

    this.index++;
    return { value, done: false };
  }
}

Group.prototype[Symbol.iterator] = function () {
  return new GroupIterator(this);
};

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
