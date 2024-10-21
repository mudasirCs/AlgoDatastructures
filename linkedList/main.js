import linkedList from "./linkedList.mjs";

const list = linkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.prepend("turtle");
list.prepend("eel");
console.log(list.toString());
let size = list.size();
for (let i = 0; i < size; i++) {
  console.log(list.at(i).value);
}
console.log(list.pop());
console.log(list.toString());

console.log(list.find("dog"));
list.insertAt("binniee", 6);
list.removeAt(6);
console.log(list.toString());
