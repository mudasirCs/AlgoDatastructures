const board = Array.from({ length: 8 }, () => Array(8).fill(0));
const background = (colorCode, text) => `\x1b[${colorCode}m${text} \x1b[0m`;

const printBoard = (arr = board) => {
  for (let y = board.length - 1; y >= 0; y--) {
    process.stdout.write(background(`${47};${37}`, `${y}`));
    let block;
    for (let x = 0; x < board.length; x++) {
      if (board[y][x] == 0) block = (y + x) % 2 ? "⬜" : "⬛";
      else block = board[y][x];
      process.stdout.write(`${block} `);
    }
    console.log();
  }
  process.stdout.write(background(`${47};${37}`, `  0  1  2  3  4  5  6  7`));
  console.log();
};
printBoard();

function checkErrors(origin, destination) {
  if (!(origin instanceof Array) || !(destination instanceof Array))
    throw new Error("Provide proper inputs");
  if (origin.length != 2 || destination.length != 2)
    throw new Error("input size is not correct");
  origin.forEach((item) => {
    if (item < 0 || item > 7) throw new Error("incorrect input value");
  });
  destination.forEach((item) => {
    if (item < 0 || item > 7) throw new Error("incorrect input value");
  });
}
const knightMoves = (origin, destination) => {
  checkErrors(origin, destination);

  let currentPosition = origin;
  currentPosition.previousMove = null;
  const path = [currentPosition];
  const queue = [currentPosition];

  while (queue.length) {
    currentPosition = queue.shift();
    if (
      currentPosition[0] == destination[0] &&
      currentPosition[1] == destination[1]
    )
      break;
    exploreMoves(currentPosition).forEach((move) => {
      move.previousMove = currentPosition;
      queue.push(move);
    });
    path.push(currentPosition);
    //      [...queue,...exploreMoves(currenPosition)]
  }
  let finalPath = [];
  let tmp = currentPosition;
  while (tmp != null) {
    finalPath.unshift(tmp);
    tmp = tmp.previousMove;
  }
  return finalPath;
};

function validPosition(x, y) {
  if (x < 0 || x > 7 || y < 0 || y > 7) return false;
  return true;
}

jumps = [
  [2, 1],
  [-2, 1],
  [2, -1],
  [-2, -1],
  [1, 2],
  [-1, 2],
  [1, -2],
  [-1, -2],
];

function exploreMoves(currenPosition) {
  let newMoves = [];
  jumps.forEach(([y, x]) => {
    let [a, b] = [currenPosition[0] + y, currenPosition[1] + x];
    if (validPosition(a, b)) newMoves.push([a, b]);
  });
  return newMoves;
}

const path = knightMoves([0, 0], [7, 7]);
path.forEach(([y, x], index) => {
  board[y][x] = background(`${41};${37}`, index + 1);
});
console.log();
printBoard();
