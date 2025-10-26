const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  bold: "\x1b[1m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};
function inputTodimension(input) {
  if (input > 0 && input <= 3) return [0, input - 1];
  if (input <= 6) return [1, input - 4];
  if (input <= 9) return [2, input - 7];
  return input;
}
function delay(ms) {
  const timer = Date.now();
  while (Date.now() - timer < ms) {
  }
}
function fillTheScrren(char) {
  let str = '';
  for (let index = 0; index < 10; index++) {
    str += char.repeat(100);
    console.log(str);
  }
}
function printTicToe(grid) {
  console.clear();
  console.log("\n      TIC TAC TOE\n");
  console.log("     +---+---+---+");
  for (let i = 0; i < 3; i++) {
    let c0 = grid[i][0];
    let c1 = grid[i][1];
    let c2 = grid[i][2];
    if (c0 !== "❌ " && c0 !== "⭕ ") c0 = "   ";
    if (c1 !== "❌ " && c1 !== "⭕ ") c1 = "   ";
    if (c2 !== "❌ " && c2 !== "⭕ ") c2 = "   ";
    console.log(`     |${c0}|${c1}|${c2}|`);
    console.log("     +---+---+---+");

  }

  console.log();
}
function putTheInputBack(grid, dimension) {
  grid[dimension[0]][dimension[1]] = "   ";
}
function getCorner(grid) {
  if (grid[0][0] === "   ") return putTheInput(grid, [0, 0], "❌ ");
  if (grid[2][0] === "   ") return putTheInput(grid, [2, 0], "❌ ");
  if (grid[0][2] === "   ") return putTheInput(grid, [0, 2], "❌ ");
  if (grid[2][2] === "   ") return putTheInput(grid, [2, 2], "❌ ");
  return 0;
}
function blockTheOponent(grid,value) {
  return findWiningMove(grid,value);
}
function findWiningMove(grid, value) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] === "   ") {
        grid[i][j] = value; 
        if (isSomeoneWon(grid)) {
           grid[i][j] = "   ";
          return [i, j];  
        }
        grid[i][j] = "   "; 
      }
    }
  }
  return 0;
}

function computerPlays(grid,value,userFirst) {
if(userFirst) {
  putTheInput(grid,[1,1],value);
}
  let k;
  if (k = findWiningMove(grid,value)) {
   return putTheInput(grid,k,value);

  }
 if(k = blockTheOponent(grid,"⭕ ")){
   return  putTheInput(grid,k,value);
 }
  if (getCorner(grid)) return;
}

function putTheInput(grid, dimension, value) {
  if (!isNaN(dimension) || dimension === Infinity || dimension === undefined) {
    return 0;
  }
  const row = dimension[0];
  const col = dimension[1];
  if (grid[row][col] === "   ") {
    grid[row][col] = value;
    printTicToe(grid);
    return 1;
  }

  return 0;
}

function noValidMove(grid) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (grid[row][col] === "   ") return false;
    }
  }
  return true;
}
function isSomeoneWon(grid) {
  for (let r = 0; r < 3; r++) {
    if (grid[r][0] !== "   " && grid[r][0] === grid[r][1] && grid[r][1] === grid[r][2]) {
      return 1;
    }
  }
  for (let c = 0; c < 3; c++) {
    if (grid[0][c] !== "   " && grid[0][c] === grid[1][c] && grid[1][c] === grid[2][c]) {
      return 1;
    }
  }
  if (grid[0][0] !== "   " && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) return 1;
  if (grid[2][0] !== "   " && grid[2][0] === grid[1][1] && grid[1][1] === grid[0][2]) return 1;
  return 0;
}

function ticTacToe(grid , para ) {
  printTicToe(grid);
    const input2 = inputTodimension(parseInt(prompt("Player Number 2 (⭕ ): ")));
  if (!putTheInput(grid, input2, "⭕ ")) {
    return "wrong Input Was Given";
  }
  if (isSomeoneWon(grid)) {
    printTicToe(grid);
    return "❌ ";
  }
  printTicToe(grid);
  computerPlays(grid,"❌ ",para);
  if (noValidMove(grid)) {
    printTicToe(grid);
    console.log("It's a draw!");
    return "DRAW";
  }

  if (noValidMove(grid)) {
    printTicToe(grid);
    console.log("It's a draw!");
    return "DRAW";
  }
  if (isSomeoneWon(grid)) {
    printTicToe(grid);
    return "⭕ ";
  }
  return grid;
}

function mainTicToe(grid) {
  const result = ticTacToe(grid , true);

  if (result === "EXIT") {
    return;
  }
  if (result === "❌ ") {
    fillTheScrren("❌ ");
    delay(2000);
    console.clear();
    printTicToe(grid);
    console.log(`${colors.red}${colors.bold}🎉 Player ❌  has won!${colors.reset}`); return;
  }
  if (result === "⭕ ") {
    fillTheScrren("⭕ ");
    delay(2000);
    console.clear();
    console.log(`${colors.red}${colors.bold}🎉 Player ⭕  has won!${colors.reset}`); return;

  }
  if (result === "DRAW") {
    console.log(colors.cyan + "🤝 It's a Draw! No one won." + colors.reset);
    return;
  }
  if (result === "wrong Input Was Given") {
    console.log(colors.yellow + "⚠️ Invalid move! That cell is taken or input was wrong. Try again." + colors.reset);
    delay(2000);
    return mainTicToe(grid);
  }
  return mainTicToe(result);
}

function main() {
  let grid = [
    ["   ", "   ", "   "],
    ["   ", "   ", "   "],
    ["   ", "   ", "   "],
  ];
  mainTicToe(grid);


  if (confirm("Do you wanna play again ? ")) {
main();
  }
}

main();
