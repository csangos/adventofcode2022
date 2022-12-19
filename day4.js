"use strict";

const fs = require("fs");
const { send, exit } = require("process");

const readFileLines = (filename) =>
  fs.readFileSync(filename).toString("UTF8").split("\n");

const arr = readFileLines("day4test.txt");

// const charScore = [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"];
let count = 0;

/*
// Day Four part 1
for (let i = 0; i < arr.length; i++) {
  const moves = arr[i].split(",");
  const elf1 = moves[0].split("-").map(Number);
  const elf2 = moves[1].split("-").map(Number);

  if (
    (elf1[0] >= elf2[0] && elf1[1] <= elf2[1]) ||
    (elf2[0] >= elf1[0] && elf2[1] <= elf1[1])
  ) {
    console.log(`Full overlap: ${elf1}:${elf2}`);
    count++;
  }
  console.log("\n");
}
*/

// Day Four part 2
for (let i = 0; i < arr.length; i++) {
  const moves = arr[i].split(",");
  const elf1 = moves[0].split("-").map(Number);
  const elf2 = moves[1].split("-").map(Number);

  if (
    (elf1[0] >= elf2[0] && elf1[0] <= elf2[1]) ||
    (elf2[0] >= elf1[0] && elf2[0] <= elf1[1])
  ) {
    console.log(`Some overlap: ${elf1}:${elf2}`);
    count++;
  }
  console.log("\n");
}

console.log(`Count: ${count}`);
