import hashMap from "./hashmap.mjs";

let test = new hashMap(16, 0.75);
console.log(test.hash("james"));
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("tiger", "striped");
test.set("hat", "narka");
// console.log(hashMapObj.remove("kenan"));
// hashMapObj.set("kenan", "jamerson");
test.display();

// console.log(hashMapObj.length());
// console.log(hashMapObj.keys().length);
// console.log(hashMapObj.values().length);
console.log(test.entries());
