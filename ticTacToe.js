function printTicToe(grid) {
  for (let index = 0; index < grid.length; index++)
    console.log(grid[index]);
}
function putTheInput(grid, dimension, value) {
  if (grid[dimension[0]][dimension[1]] === "_") {
    grid[dimension[0]][dimension[1]] = value;
    return;
  }
return 0;
}
function evaluateTheGrid(grid) {
  // vertical 
  if (grid[0][0] === grid[1][0] === grid[2][0]) return 1;
  if (grid[0][1] === grid[1][1] === grid[2][1]) return 1;
  if (grid[0][2] === grid[1][2] === grid[2][2]) return 1;
  // horizental
  if (grid[0][0] === grid[0][1] === grid[0][2]) return 1;
  if (grid[1][0] === grid[1][1] === grid[1][2]) return 1;
  if (grid[2][0] === grid[2][1] === grid[2][2]) return 1;
  // cross check
  if (grid[0][0] === grid[1][1] === grid[2][2]) return 1;

  if (grid[2][0] === grid[1][1] === grid[0][2]) return 1;

  return 0;
}
function ticTacToe(grid) {
  printTicToe(grid);
  const input1 = prompt("Player Number 1 Cordinate1 Cordinate2  ");
  if (!putTheInput(grid, input1, "X")) {
    return "wrong Input Was Given"
  }
  if (evaluateTheGrid(grid)) {
    printTicToe(grid);
    return `${currentPlayer} Has Won the Game`;
  }
  printTicToe(grid);
  const input2 = prompt("Player Number 2 enter");
  if (!putTheInput(grid, input2, "O")) {
    return "wrong Input Was Given"
  }
  if (evaluateTheGrid(grid)) {
    printTicToe(grid);
    return `${currentPlayer} Has Won the Game`;
  }
  return 0;
}
function mainTicToe() {
  let grid = [["_", "_", "_"], ["_", "_", "_"], ["_", "_", "_"]];
  grid = ticTacToe(grid);
  if (grid) {
    console.log(grid);
  }
  else {
    mainTicToe();
  }
}

function main() {
  mainTicToe();
}
main();
