"use strict";

const fs = require("fs");
const { send } = require("process");

const readFileLines = (filename) =>
  fs.readFileSync(filename).toString("UTF8").split("\n");

const arr = readFileLines("day1-1.txt");
let sum = 0;
let highest = 0;
let secondHighest = 0;
let thirdHighest = 0;

for (let i = 0; i < arr.length; i++) {
  if (arr[i] == "") {
    console.log(`end of elf list: sum ${sum}`);
    if (highest < sum) {
      thirdHighest = secondHighest;
      secondHighest = highest;
      highest = sum;
    } else if (secondHighest < sum) {
      thirdHighest = secondHighest;
      secondHighest = highest;
    } else if (thirdHighest < sum) {
      thirdHighest = sum;
    }
    sum = 0;
  } else {
    sum += Number(arr[i]);
  }
}

console.log(`1st Highest is: ${highest}`);
console.log(`2nd Highest is: ${secondHighest}`);
console.log(`3rd Highest is: ${thirdHighest}`);
console.log(`Total is: ${highest + secondHighest + thirdHighest}`);
