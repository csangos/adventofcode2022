"use strict";

const fs = require("fs");
const { send } = require("process");

const readFileLines = (filename) =>
  fs.readFileSync(filename).toString("UTF8").split("\n");

const arr = readFileLines("day2.txt");
let score = 0;
let highest = 0;
let secondHighest = 0;
let thirdHighest = 0;

// Rules
// A - Rock
// B - Paper
// C - Scissors
// X - Rock (1)
// Y - Paper (2)
// Z - Scissors (3)
// Lose - 0
// Draw - 3
// Win - 6

// If X, Y, and Z mean Rock, Paper, Scissors
// for (let i = 0; i < arr.length; i++) {
//   const moves = arr[i].split(" ");
//   switch (moves[0]) {
//     case "A":
//       if (moves[1] == "X") {
//         score += 1 + 3;
//       } else if (moves[1] == "Y") {
//         score += 2 + 6;
//       } else {
//         score += 3 + 0;
//       }
//       break;
//     case "B":
//       if (moves[1] == "X") {
//         score += 1 + 0;
//       } else if (moves[1] == "Y") {
//         score += 2 + 3;
//       } else {
//         score += 3 + 6;
//       }
//       break;
//     case "C":
//       if (moves[1] == "X") {
//         score += 1 + 6;
//       } else if (moves[1] == "Y") {
//         score += 2 + 0;
//       } else {
//         score += 3 + 3;
//       }
//       break;
//   }
// }

// If X, Y, and Z mean Lose, Draw, Win
for (let i = 0; i < arr.length; i++) {
  const moves = arr[i].split(" ");
  switch (moves[0]) {
    case "A":
      if (moves[1] == "X") {
        score += 3 + 0;
      } else if (moves[1] == "Y") {
        score += 1 + 3;
      } else {
        score += 2 + 6;
      }
      break;
    case "B":
      if (moves[1] == "X") {
        score += 1 + 0;
      } else if (moves[1] == "Y") {
        score += 2 + 3;
      } else {
        score += 3 + 6;
      }
      break;
    case "C":
      if (moves[1] == "X") {
        score += 2 + 0;
      } else if (moves[1] == "Y") {
        score += 3 + 3;
      } else {
        score += 1 + 6;
      }
      break;
  }
}

console.log(score);
