const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
}

function showStatus(enteredWord, toGuessWord) {
  let coloredOutput = "";

  if (enteredWord === toGuessWord) {
    console.log(colors.green + toGuessWord + colors.reset);
    console.log("Hurray you have won");
    return "YEAH You Won";
  }

  for (let index = 0; index < enteredWord.length; index++) {
    const currChar = enteredWord[index];

    if (currChar === toGuessWord[index]) {
      coloredOutput += colors.green + " " + currChar + colors.reset;
    } else if (toGuessWord.includes(currChar)) {
      coloredOutput += colors.yellow + " " + currChar + colors.reset;
    } else {
      coloredOutput += " " + currChar;
    }
  }

  console.log(coloredOutput);
  return coloredOutput;
}

function getRandomWord(difficulty) {
  const fiveCharWords = [
    "apple", "brave", "crane", "flame", "grape", "plane", "charm", "trace", "smile", "light",
    "sharp", "grind", "storm", "flock", "chair", "house", "place", "train", "brand", "shine",
    "brick", "bloom", "crown", "field", "glass", "pride", "speak", "tiger", "ocean", "frost",
    "bread", "table", "sweet", "heart", "music", "laugh", "world", "dream", "quick", "happy",
    "zebra", "angel", "giant", "storm", "flute", "grind", "smoke", "spice", "stone", "flair",
    "river", "beach", "sword", "plant", "cloud", "flown", "treat", "store", "smart", "wheat",
    "sight", "night", "earth", "grape", "peace", "flown", "fence", "spoon", "sugar", "lemon",
    "apple", "blush", "candy", "chess", "chill", "cider", "clear", "climb", "cloth", "color",
    "crash", "creek", "curry", "dance", "daisy", "delta", "dream", "dress", "drift", "drink",
    "eagle", "early", "earth", "elbow", "entry", "equal", "event", "faith", "fancy", "field",
  ];
  const word6 = [
    "abroad", "absent", "accept", "access", "accord", "acting", "active", "actual", "admire", "advice",
    "affect", "afford", "agency", "agenda", "almost", "always", "amount", "anchor", "animal", "annual",
    "answer", "appeal", "artist", "aspect", "assign", "assist", "assume", "attack", "attend", "august",
    "author", "backup", "banner", "beauty", "belief", "belong", "better", "beyond", "bishop", "border",
    "bottle", "bottom", "branch", "breath", "bridge", "bright", "broken", "budget", "burden", "butter"
  ];
  const words7 = [
    "ability", "absence", "academy", "account", "achieve", "address", "advance", "adviser", "airport", "amazing",
    "analyst", "ancient", "another", "anxiety", "anybody", "apology", "approve", "article", "attempt", "attract",
    "backing", "balance", "barrier", "battery", "because", "benefit", "besides", "between", "beyond", "biology",
    "blanket", "breathe", "brother", "builder", "cabinet", "capable", "capital", "captain", "carrier", "central",
    "century", "certain", "chamber", "chances", "channel", "charity", "chicken", "citizen", "classic", "climate",
    "college", "comfort", "command", "company", "compare", "compete", "concept", "confirm", "connect", "contain",
    "content", "context", "control", "convert", "cooking", "copying", "correct", "country", "crystal", "culture",
    "current", "cutting", "declare", "defence", "deliver", "denying", "density", "deposit", "deserve", "destroy",
    "develop", "diamond", "digital", "discuss", "distant", "diverse", "drawing", "dressed", "driving", "dynamic",
    "economy", "edition", "educate", "efforts", "elastic", "elderly", "elegant", "element", "engaged", "exhibit"
  ];
  const words3 = [
    "ace", "act", "add", "age", "ago", "aid", "aim", "air", "all", "and",
    "ant", "any", "ape", "app", "arm", "art", "ash", "ask", "awe", "bad",
    "bag", "bar", "bat", "bay", "bed", "bee", "beg", "bet", "bid", "big",
    "bit", "bow", "box", "boy", "bug", "bun", "bus", "but", "buy", "cab",
    "can", "cap", "car", "cat", "cow", "cry", "cub", "cup", "cut", "day",
    "den", "dew", "dig", "dip", "dog", "dot", "dry", "dub", "due", "dug",
    "ear", "eat", "egg", "elf", "end", "eye", "fan", "far", "fat", "fax",
    "fed", "fig", "fin", "fit", "fix", "fly", "fog", "for", "fox", "fun",
    "fur", "gap", "gas", "get", "gig", "god", "gum", "gun", "gut", "guy"
  ];
  const randomWordIndex = Math.floor(Math.random() * 100);
  if (difficulty === 3) {
    return words7[randomWordIndex];
  }
  if (difficulty === 1) {
    return words3[randomWordIndex];
  }
  if (difficulty === 2) {
    return word6[randomWordIndex];
  }
  return fiveCharWords[randomWordIndex];
}
function numberOFlife(difficulty) {
  let life = "❤️ ";
  if (difficulty === 3) {
    return life.repeat(10);
  }
  if (difficulty === 1) {
    return life.repeat(5);
  }
  if (difficulty === 2) {
    return life.repeat(10);
  }
  return life.repeat(7);
}
function ifGuessWrong(guessedWord, actualWord) {
  return guessedWord === actualWord;
}
function removeLife(life) {
  return life.slice(0, life.length - 3);
}

function wordle() {
  const level1 = "🟢 Level 1 → 3 words | 5 Lives";
  const level2 = "🟡 Level 2 → 6 words | 10 Lives";
  const level3 = "🔴 Level 3 → 7 words | 10 Lives";
  const defaultLevel = "⚪ Default → 5 words | 7 Lives";
  console.log(level1);
  console.log(level2);
  console.log(level3);
  console.log(defaultLevel);

  const diffi = parseInt(prompt("🎮 Enter the difficulty level:"), 10);
  console.clear();
  const toGuessWord = getRandomWord(diffi);
  let lifeToPlay = numberOFlife(diffi);
  while (lifeToPlay.length > 0) {

    const enteredWord = prompt("Guess The word");
    const status = showStatus(enteredWord, toGuessWord);
    if (status === "YEAH You Won")
      break;
    lifeToPlay = lifeToPlay.slice(0, lifeToPlay.length - 3);
    console.log(lifeToPlay);
  }
  if (lifeToPlay.length === 0) {
    console.log("You Lost");
    console.log(`The word was ${toGuessWord}`);
  }
}
wordle();
