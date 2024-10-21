let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};

function printList(list) {
  let tmp = [];
  while (list != null) {
    tmp.unshift(list.value);
    list = list.next;
  }
  console.log(tmp.join(", "));
}
printList(list);

// function printList(list) {
//   if (list == null) {
//     return;
//   }
//   printList(list.next);
//   console.log(list.value);
// }
