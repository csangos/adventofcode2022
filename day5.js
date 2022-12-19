"use strict";

const fs = require("fs");
const { send, exit } = require("process");

const readFileLines = (filename) =>
  fs.readFileSync(filename).toString("UTF8").split("\n");

const arr = readFileLines("day5.txt");

// Find the label row and work up to the top of the file from there
let labelRow = 0;
while (arr[labelRow][1] !== "1") {
  labelRow++;
}
console.log(`Label row found: ${labelRow + 1}`);
console.log(`Label row: ${arr[labelRow]}`);
const stacks = arr[labelRow].split(" ")[arr[labelRow].split(" ").length - 2];
console.log(`Stacks: ${stacks}`);
const stacksArr = [];

// Create initial empty stacks arrays
for (let j = 0; j < stacks; j++) {
  stacksArr.push([]);
}

// populate the stacks with vales from each row above the label
for (let i = labelRow - 1; i >= 0; i--) {
  //   console.log(`working on row: ${arr[i]}`);
  for (let j = 0; j < stacks; j++) {
    if (j === 0) {
      if (arr[i][j + 1] !== " ") {
        stacksArr[j].push(arr[i][j + 1]);
      }
    } else {
      if (arr[i][j * 4 + 1] !== " ") {
        stacksArr[j].push(arr[i][j * 4 + 1]);
      }
    }
  }
}
console.log("Initial stacks: ", stacksArr);

/*
// Process for Day 5 part 1
// Do the crane moves on the crates per the rules
for (let i = labelRow + 2; i < arr.length; i++) {
  console.log(`Working on ${arr[i]}`);
  const moves = arr[i].split(" ");
  for (let j = 1; j <= moves[1]; j++) {
    const crane = stacksArr[Number(moves[3] - 1)].pop();
    stacksArr[Number(moves[5] - 1)].push(crane);
  }
}
*/

// Process for Day 5 part 2
// Do the crane moves on the crates per the rules
for (let i = labelRow + 2; i < arr.length; i++) {
  console.log(`Working on ${arr[i]}`);
  const moves = arr[i].split(" ");
  const crane = [];
  for (let j = 1; j <= moves[1]; j++) {
    crane.push(stacksArr[Number(moves[3] - 1)].pop());
  }
  //   console.log(`Crane: ${crane} : length ${crane.length}`);
  const counter = crane.length;
  for (let k = 0; k < counter; k++) {
    const cranePop = crane.pop();
    // console.log(cranePop, crane.length);
    stacksArr[Number(moves[5] - 1)].push(cranePop);
  }
  //   console.log(stacksArr);
}

console.log("Final stacks: ", stacksArr);
// Create the final character set from the top most crate in each stack
let message = "";
for (let i = 0; i < stacksArr.length; i++) {
  message += stacksArr[i].pop();
}
console.log(`Message: ${message}`);
