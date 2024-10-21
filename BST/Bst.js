class Node {
  constructor(data) {
    this.data = data;
    this.leftNode = null;
    this.rightNode = null;
  }
  countChildren() {
    let count = 0;
    if (this.leftNode != null) count++;
    if (this.rightNode != null) count++;
    return count;
  }
}

class Tree {
  constructor(arr = []) {
    if (arr.length == 0) {
      this.root = null;
      return;
    }
    this.root = this.buildTree(this.arrayCleaner(arr));
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;

    let middle = Math.floor((end + start) / 2);
    let root = new Node(arr[middle]);

    root.leftNode = this.buildTree(arr, start, middle - 1);
    root.rightNode = this.buildTree(arr, middle + 1, end);

    return root;
  }

  insert(value) {
    let newNode = new Node(value);

    let prev = null;
    let tmp = this.root;

    while (tmp != null) {
      prev = tmp;
      if (value <= tmp.data) {
        tmp = tmp.leftNode;
      } else if (value > tmp.data) {
        tmp = tmp.rightNode;
      }
    }

    if (prev == null) {
      this.root = newNode;
      return;
    }

    if (value <= prev.data) prev.leftNode = newNode;
    else prev.rightNode = newNode;
  }

  delete(value) {
    let prev = null,
      tmp = this.root;

    while (tmp.data != value) {
      prev = tmp;
      if (value <= tmp.data) {
        tmp = tmp.leftNode;
      } else tmp = tmp.rightNode;

      if (tmp == null) {
        return null;
      }
    }

    if (tmp.countChildren() == 0) {
      this.removeNodeFromParent(prev, tmp);
    } else if (tmp.countChildren() == 1) {
      let child = tmp.rightNode ? tmp.rightNode : tmp.leftNode;

      if (tmp.data <= prev.data) prev.leftNode = child;
      else prev.rightNode = child;
    } else {
      let replacementNode = this.findMaxOfLeftTree(tmp);
      if (!replacementNode) replacementNode = this.findMinOfRightTree(tmp);

      this.delete(replacementNode.data);
      if (prev == null) {
        this.root.data = replacementNode.data;
        // this.root.leftNode = tmp.leftNode;
        // this.root.rightNode = tmp.rightNode;
      } else {
        tmp.data = replacementNode.data;
      }
    }
  }

  find(value) {
    if (this.root == null) return null;

    let tmp = this.root;

    while (tmp.data != value) {
      if (value <= tmp.data) tmp = tmp.leftNode;
      else tmp = tmp.rightNode;

      if (tmp == null) return null;
    }

    // if (prev == null) {
    //   console.log("this is root");
    //   return tmp;
    // } else if (tmp.data <= prev.data)
    //   console.log(`${prev.data} leftChild-> ${tmp.data}`);
    // else console.log(`${prev.data} rightChild-> ${tmp.data}`);

    return tmp;
  }

  iterativeLevelOrder(callback = print) {
    if (callback == null || !(callback instanceof Function)) {
      throw new Error("Need to provide a callback function");
    }

    if (this.root == null) return null;

    let q = [this.root];
    let spaces = 1,
      spacePile = 0,
      limit = 1;

    while (q.length) {
      let currNode = q.shift();

      // process.stdout.write("|");
      // Array(spaces)
      //   .fill()
      //   .forEach(() => process.stdout.write("-"));
      // process.stdout.write(">");

      callback(currNode);

      if (currNode.leftNode) {
        q.push(currNode.leftNode);
        spacePile++;
      }
      if (currNode.rightNode) {
        q.push(currNode.rightNode);
        spacePile++;
      }

      limit--;
      if (limit == 0) {
        spaces++;
        limit = spacePile;
        spacePile = 0;
        // console.log();
      }
    }
  }

  recursiveLevelOrder(callback, queue = [this.root]) {
    if (callback == null || !(callback instanceof Function))
      throw new Error("Callback function is required");
    if (queue.length == 0) return;
    if (this.root == null) return null;

    let tmp = queue.shift();
    let spaces = tmp.spaces ? tmp.spaces : 0;

    Array.from({ length: spaces }, () => process.stdout.write("-"));
    process.stdout.write(">");
    callback(tmp);

    if (tmp.leftNode != null) {
      tmp.leftNode.spaces = spaces + 1;
      queue.push(tmp.leftNode);
    }
    if (tmp.rightNode != null) {
      tmp.rightNode.spaces = spaces + 1;
      queue.push(tmp.rightNode);
    }

    this.recursiveLevelOrder(callback, queue);
  }

  preOrder(callback = print, node = this.root) {
    if (node == null) return;

    if (callback == null || !(callback instanceof Function))
      throw new Error("Callback function required");
    if (this.root == null) return null;

    callback(node);
    this.preOrder(callback, node.leftNode);
    this.preOrder(callback, node.rightNode);
  }

  inOrder(callback = print, node = this.root) {
    if (node == null) return;

    if (callback == null || !(callback instanceof Function))
      throw new Error("Callback function required");
    if (this.root == null) return null;

    this.inOrder(callback, node.leftNode);
    callback(node);
    this.inOrder(callback, node.rightNode);
  }

  postOrder(callback = print, node = this.root) {
    if (node == null) return;

    if (!(callback instanceof Function))
      throw new Error("Callback function required");

    this.postOrder(callback, node.leftNode);
    this.postOrder(callback, node.rightNode);
    callback(node);
  }

  // height(node = this.root, ht = 0) {
  //   if (node == null) return ht - 1;

  //   let leftHeight = this.height(node.leftNode, ht + 1);
  //   let rightHeight = this.height(node.rightNode, ht + 1);
  //   if (leftHeight <= rightHeight) {
  //     return rightHeight;
  //   } else return leftHeight;
  // }

  height(node = this.root) {
    if (node == null) return -1;

    let leftHeight = this.height(node.leftNode) + 1;
    let rightHeight = this.height(node.rightNode) + 1;
    if (leftHeight <= rightHeight) {
      return rightHeight;
    } else return leftHeight;
  }

  depth(node = this.root) {
    if (node == null) return null;
    let tmp = this.root,
      depth = 0;

    while (tmp.data != node.data) {
      if (node.data <= tmp.data) tmp = tmp.leftNode;
      else tmp = tmp.rightNode;
      if (tmp == null) return null;
      depth++;
    }
    return depth;
  }

  isBalanced(root = this.root) {
    let leftSet = new Set(this.findTreeHeightSet(root.leftNode));
    let rightSet = new Set(this.findTreeHeightSet(root.rightNode));

    for (let leftNode of leftSet) {
      for (let rightNode of rightSet) {
        if (Math.abs(rightNode - leftNode) > 1) return false;
      }
    }

    return true;
  }

  rebalance() {
    let arr = [];
    const callback = (node) => arr.push(node.data);
    this.iterativeLevelOrder(callback);
    arr.sort((a, b) => a - b);
    this.root = this.buildTree(arr);
  }

  findTreeHeightSet(node) {
    if ((node.leftNode == null) & (node.rightNode == null)) {
      // console.log(`added ${node.data}`);
      return [0];
    }

    let arr = [];
    if (node.leftNode != null) {
      arr = [...arr, ...this.findTreeHeightSet(node.leftNode)];
    }
    if (node.rightNode != null) {
      arr = [...arr, ...this.findTreeHeightSet(node.rightNode)];
    }
    arr.forEach((item, index) => (arr[index] = item + 1));
    return arr;
  }

  findMaxOfLeftTree(root) {
    if (root == null || root.leftNode == null) return null;
    let tmp = root.leftNode;
    while (tmp.rightNode != null) {
      tmp = tmp.rightNode;
    }
    return tmp;
  }

  findMinOfRightTree(root) {
    if (root == null || root.rightNode == null) return null;
    let tmp = root.rightNode;
    while (tmp.leftNode != null) {
      tmp = tmp.leftNode;
    }
    return tmp;
  }

  removeNodeFromParent(parent, child) {
    if (child.data <= parent.data) parent.leftNode = null;
    else parent.rightNode = null;
  }

  arrayCleaner(arr) {
    return [...new Set(arr)].sort((a, b) => a - b);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.rightNode !== null) {
      this.prettyPrint(
        node.rightNode,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftNode !== null) {
      this.prettyPrint(
        node.leftNode,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  }
}

// testArr = [2, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// let tree = new Tree(testArr);
// console.log();

// tree.insert(-1);
// tree.insert(-2);
// tree.insert(-3);
// tree.prettyPrint();
const print = (node) => process.stdout.write(`${node.data} `);
// tree.iterativeLevelOrder((node) => {
//   console.log(node.data);
// });
// console.log(tree.find(67).data);
// tree.recursiveLevelOrder((node) => console.log(node.data));
// tree.postOrder();
// console.log(tree.height(tree.find(-3)));
// console.log(tree.depth(tree.find(2)));
// console.log(tree.findTreeHeightSet(tree.root.leftNode));
// console.log(tree.isBalanced());
// tree.rebalance();
// tree.prettyPrint();

// Tie it all together
const randomNumGenerator = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
let arr = Array.from({ length: randomNumGenerator(15, 5) }, () =>
  randomNumGenerator(100, 0)
);
let tree = new Tree(arr);
console.log(
  `Generated Array: size[${arr.length}] ${arr}
  `
);
console.log("Generated Tree\n");
tree.prettyPrint();
console.log(`\nTree balanced status: ${tree.isBalanced()}`);
console.log("Preorder");
tree.preOrder();
console.log("\nInorder");
tree.inOrder();
console.log("\nPostorder");
tree.postOrder();
Array(randomNumGenerator(5, 9))
  .fill()
  .forEach(() => tree.insert(randomNumGenerator(100, 0)));
console.log("\n\nModified Tree\n");
tree.prettyPrint();
console.log(`\nTree balanced status: ${tree.isBalanced()}`);

tree.rebalance();
console.log("\nRebalanced Tree\n");
tree.prettyPrint();
console.log(`\nTree balanced status: ${tree.isBalanced()}`);
console.log("Levelorder");
tree.iterativeLevelOrder();
console.log("\nPreorder");
tree.preOrder();
console.log("\nInorder");
tree.inOrder();
console.log("\nPostorder");
tree.postOrder();
