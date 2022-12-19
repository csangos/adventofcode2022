"use strict";

const fs = require("fs");
const { send, exit } = require("process");

const readFileLines = (filename) =>
  fs.readFileSync(filename).toString("UTF8").split("\n");

const arr = readFileLines("day6.txt");

/*
// Poor way to do Day 6 part 1
for (let i = 0; i < arr[0].length; i++) {
  console.log(`Searching positions ${i}:${i + 4} : ${arr[0].slice(i, i + 4)}`);

  console.log(arr[0][i]);
  if (arr[0].slice(i + 1, i + 4).includes(arr[0][i])) {
    console.log(`Duplicate ${arr[0][i]} detected: ${arr[0].slice(i, i + 4)}`);
    continue;
  }
  console.log(arr[0][i + 1]);
  if (arr[0].slice(i + 2, i + 4).includes(arr[0][i + 1])) {
    console.log(
      `Duplicate ${arr[0][i + 1]} detected: ${arr[0].slice(i, i + 4)}`
    );
    continue;
  }
  console.log(arr[0][i + 2]);
  if (arr[0].slice(i + 3, i + 4).includes(arr[0][i + 2])) {
    console.log(
      `Duplicate ${arr[0][i + 2]} detected: ${arr[0].slice(i, i + 4)}`
    );
    continue;
  }
  console.log(
    `Found unique pattern: ${arr[0].slice(i, i + 4)}, ending position ${i + 4}`
  );
  break;
}
*/

// Day 6 Part 2 - This would be a way better way than Part 1 above :)
for (let i = 0; i < arr[0].length; i++) {
  const subset = [...new Set(arr[0].slice(i, i + 14))];
  if (subset.length === 14) {
    console.log(`Found a message at position: ${i + 14}`);
    break;
  }
}
