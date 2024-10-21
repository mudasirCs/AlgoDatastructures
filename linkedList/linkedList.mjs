import Node from "./node.mjs";

export default function linkedList(initialHead = null) {
  let head = initialHead;
  function append(value) {
    let newNode = Node(value);
    if (head == null) {
      head = newNode;
      return newNode;
    }
    let tmp = head;
    while (tmp.nextNode != null) {
      tmp = tmp.nextNode;
    }
    tmp.nextNode = newNode;
    return newNode;
  }
  function prepend(value) {
    let newNode = Node(value);
    if (head == null) head = newNode;
    else {
      let tmp = head;
      [head, newNode.nextNode] = [newNode, tmp];
    }
  }
  function size() {
    if (head == null) return 0;
    let tmp = head;
    let size = 0;
    while (tmp != null) {
      tmp = tmp.nextNode;
      size++;
    }
    return size;
  }
  function tail() {
    if (head == null) return null;
    let tmp = head;
    while (tmp.nextNode != null) {
      tmp = tmp.nextNode;
    }
    return tmp;
  }
  function at(index) {
    if (head == null || index + 1 > this.size()) return null;
    let tmp = head;
    let tmpIndex = 0;
    while (tmpIndex != index) {
      tmp = tmp.nextNode;
      tmpIndex++;
    }
    return tmp;
  }
  function pop() {
    if (head == null) return null;
    let prevNode = null;
    let currNode = head;
    while (currNode.nextNode != null) {
      prevNode = currNode;
      currNode = currNode.nextNode;
    }
    if (prevNode) {
      prevNode.nextNode = null;
    } else {
      head = null;
    }
    return currNode;
  }
  function contains(value) {
    if (head == null) return false;
    let tmp = head;
    while (tmp != null) {
      if (tmp.value == value) return true;
      tmp = tmp.nextNode;
    }
    return false;
  }
  function find(value) {
    if (head == null) return false;
    let tmp = head;
    let index = 0;
    while (tmp != null) {
      if (tmp.value == value) return index;
      tmp = tmp.nextNode;
      index++;
    }
    return false;
  }
  function toString() {
    if (head == null) return "null";
    let tmp = head;
    let stringTemplate = "";
    while (tmp != null) {
      stringTemplate += `( ${tmp.value} ) -> `;
      tmp = tmp.nextNode;
    }
    stringTemplate += `null`;
    return stringTemplate;
  }
  function insertAt(value, index) {
    if (index > this.size() || index < 0) return;

    let newNode = Node(value);

    if (index == 0) {
      newNode.nextNode = head;
      head = newNode;
      return;
    }
    let tmp = head;
    let idx = 0;

    while (idx != index - 1) {
      tmp = tmp.nextNode;
      idx++;
    }

    newNode.nextNode = tmp.nextNode;
    tmp.newNode = newNode;
  }
  function removeAt(index) {
    if (index >= this.size() || index < 0) return;
    let prevNode = null,
      currNode = head,
      idx = 0;
    while (idx != index) {
      prevNode = currNode;
      currNode = currNode.nextNode;
      idx++;
    }
    if (prevNode) prevNode.nextNode = currNode.nextNode;
    else head = currNode.nextNode;
    currNode.nextNode = null;
    return currNode;
  }
  return {
    append,
    prepend,
    size,
    get head() {
      return head;
    },
    tail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
}
