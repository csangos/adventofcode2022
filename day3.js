"use strict";

const fs = require("fs");
const { send, exit } = require("process");

const readFileLines = (filename) =>
  fs.readFileSync(filename).toString("UTF8").split("\n");

const arr = readFileLines("day3.txt");

const charScore = [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"];
// console.log(charScore);
let score = 0;

/*
// For Day 3 part 1
for (let i = 0; i < arr.length; i++) {
  //   console.log(`checking item ${i + 1}`);
  const compartmentOne = arr[i].slice(0, arr[i].length / 2);
  const compartmentTwo = arr[i].slice(arr[i].length / 2);
  //   console.log(arr[i], " : ", compartmentOne, " : ", compartmentTwo);
  for (let j = 0; j < compartmentOne.length; j++) {
    const foundIndex = compartmentTwo.search(compartmentOne[j]);
    if (foundIndex !== -1) {
      //   console.log(`Found ${compartmentTwo[foundIndex]}`);
      //   console.log(charScore.indexOf(compartmentTwo[foundIndex]) + 1);
      //   console.log(charScore.indexOf(compartmentTwo[foundIndex]));
      score += charScore.indexOf(compartmentTwo[foundIndex]) + 1;
      break;
    }
  }
}
*/

for (let i = 0; i < arr.length; i = i + 3) {
  console.log(`Checking group ID ${i}`);
  for (let j = 0; j < arr[i].length; j++) {
    const foundIndex2 = arr[i + 1].search(arr[i][j]);
    const foundIndex3 = arr[i + 2].search(arr[i][j]);
    // console.log(foundIndex2, foundIndex3);
    if (foundIndex2 !== -1 && foundIndex3 !== -1) {
      console.log(`Found ${arr[i + 1][foundIndex2]}`);
      score += charScore.indexOf(arr[i + 1][foundIndex2]) + 1;
      break;
    }
  }
}

console.log(`Total score: ${score}`);
