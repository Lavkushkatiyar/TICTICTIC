const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  bold: "\x1b[1m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};
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
  console.log("       1   2   3 ");
  console.log("     +---+---+---+");

  for (let i = 0; i < 3; i++) {
    let c0 = grid[i][0];
    let c1 = grid[i][1];
    let c2 = grid[i][2];

    if (c0 !== "  ❌ " && c0 !== "  ⭕ ") c0 = "   ";
    if (c1 !== "  ❌ " && c1 !== "  ⭕ ") c1 = "   ";
    if (c2 !== "  ❌ " && c2 !== "  ⭕ ") c2 = "   ";

    console.log(`  ${i + 1}  ${c0}${c1}${c2}`);
    console.log("     +---+---+---+");
  }

  console.log();
}
function computerPlays(grid, cmpValue) {
  for (let index = 0; index < grid.length; index++) {
    for (let index2 = 0; index2 < 3; index2++) {
      if (grid[index][index2] === "   ") {
        grid[index][index2] = cmpValue;
      }
    }
  }
}

function putTheInput(grid, dimension, value) {
  const validInput = (dimension + "").trim();
  const parts = validInput.split(/\s+|,\s*/);

  const row = +parts[0] - 1;
  const col = +parts[1] - 1;
  if (isNaN(row) || isNaN(col) || row < 0 || row > 2 || col < 0 || col > 2) {
    return 0;
  }

  if (grid[row][col] === "   ") {
    grid[row][col] = value;
    return 1;
  }
  return 0;
}

function isGridFull(grid) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (grid[row][col] === "   ") return false;
    }
  }
  return true;
}

function evaluateTheGrid(grid) {
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


function ticTacToe(grid) {
  printTicToe(grid);

  const input1 = prompt("Player Number 1 (❌): Enter row and column (1-indexed, e.g., 1 1): ");
  if (input1 === null) {
    console.log(colors.yellow + "Game aborted by user." + colors.reset);
    return "EXIT";
  }
  if (!putTheInput(grid, input1, "  ❌ ")) {
    return "wrong Input Was Given";
  }

  if (isGridFull(grid)) {
    printTicToe(grid);
    console.log("It's a draw!");
    return "DRAW";
  }
  if (evaluateTheGrid(grid)) {
    printTicToe(grid);
    return "  ❌ ";
  }

  printTicToe(grid);
  const input2 = prompt("Player Number 2 (⭕): Enter row and column (1-indexed, e.g., 2 3): ");
  if (input2 === null) {
    console.log(colors.yellow + "Game aborted by user." + colors.reset);
    return "EXIT";
  }
  if (!putTheInput(grid, input2, "  ⭕ ")) {
    return "wrong Input Was Given";
  }

  if (isGridFull(grid)) {
    printTicToe(grid);
    console.log("It's a draw!");
    return "DRAW";
  }
  if (evaluateTheGrid(grid)) {
    printTicToe(grid);
    return "  ⭕ ";
  }
  return grid;
}

function mainTicToe(grid) {
  const result = ticTacToe(grid);

  if (result === "EXIT") {
    return;
  }
  if (result === "  ❌ ") {
    fillTheScrren("  ❌ ");
    delay(2000);
    console.clear();
    console.log(`${colors.red}${colors.bold}🎉 Player ❌ has won!${colors.reset}`); return;
  }
  if (result === "  ⭕ ") {
    fillTheScrren("  ⭕ ");
    delay(2000);
    console.clear();
    console.log(`${colors.red}${colors.bold}🎉 Player ⭕ has won!${colors.reset}`); return;

  }
  if (result === "DRAW") {
    console.log(colors.cyan + "🤝 It's a Draw! No one won." + colors.reset);
    return;
  }
  if (result === "wrong Input Was Given") {
    console.log(colors.yellow + "⚠️ Invalid move! That cell is taken or input was wrong. Try again." + colors.reset);
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
}

main();
