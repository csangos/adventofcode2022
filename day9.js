"use strict";

const { dir, count } = require("console");
const fs = require("fs");
const { validateHeaderName } = require("http");
const { send, exit } = require("process");

const readFileLines = (filename) =>
  fs.readFileSync(filename).toString("UTF8").split("\n");

const arr = readFileLines("day9.txt");

// Head and tail start in same location
let headPos = [0, 0];
let tailPos = [0, 0];
let tailPath = [[0, 0]];

// Deal with head movement
const moveHead = function (dir, num) {
  console.log(`Move ${num} ${dir} `);
  for (let j = 1; j <= num; j++) {
    switch (dir) {
      case "R":
        headPos[0]++;
        moveTail();
        break;
      case "U":
        headPos[1]++;
        moveTail();
        break;
      case "L":
        headPos[0]--;
        moveTail();
        break;
      case "D":
        headPos[1]--;
        moveTail();
        break;
    }
  }
};

// Deal with Tail movement
const moveTail = function () {
  console.log("Move Tail: H", headPos, " T", tailPos);
  const xDiff = headPos[0] - tailPos[0];
  const yDiff = headPos[1] - tailPos[1];
  console.log(`Diff: ${xDiff},${yDiff}`);

  // Diagonal check
  if (Math.abs(xDiff) >= 1 && Math.abs(yDiff) >= 1) {
    console.log("move diagonal");
    // check up and to right
    if ((xDiff === 1 && yDiff > 1) || (xDiff > 1 && yDiff === 1)) {
      tailPos[0]++;
      tailPos[1]++;
      tailPath.push([tailPos[0], tailPos[1]]);
      // check up and to left
    } else if ((xDiff < -1 && yDiff === 1) || (xDiff === -1 && yDiff > 1)) {
      tailPos[0]--;
      tailPos[1]++;
      tailPath.push([tailPos[0], tailPos[1]]);
      // check down and left
    } else if ((xDiff === -1 && yDiff < -1) || (xDiff < -1 && yDiff === -1)) {
      tailPos[0]--;
      tailPos[1]--;
      tailPath.push([tailPos[0], tailPos[1]]);
    } else if ((xDiff > 1 && yDiff === -1) || (xDiff === 1 && yDiff < -1)) {
      tailPos[0]++;
      tailPos[1]--;
      tailPath.push([tailPos[0], tailPos[1]]);
    }
    console.log("New Position: H", headPos, " T", tailPos);
    console.log("TailPath: ", tailPath);

    // Horizontal check
  } else if (Math.abs(xDiff) > 1) {
    console.log("move horizontal");
    if (xDiff > 1) {
      tailPos[0]++;
    } else {
      tailPos[0]--;
    }
    tailPath.push([tailPos[0], tailPos[1]]);
    console.log("New Position: H", headPos, " T", tailPos);
    // console.log("TailPath: ", tailPath);

    // Vertical check
  } else if (Math.abs(yDiff) > 1) {
    console.log("move vertical");
    if (yDiff > 1) {
      tailPos[1]++;
    } else {
      tailPos[1]--;
    }
    tailPath.push([tailPos[0], tailPos[1]]);
    console.log("New Position: H", headPos, " T", tailPos);
    console.log("TailPath: ", tailPath);

    // Nothing to do
  } else {
    console.log("Do nothing");
  }
  console.log("\n");
};

for (let i = 0; i < arr.length; i++) {
  const move = arr[i].split(" ");
  moveHead(move[0], move[1]);
}

console.log(headPos, tailPos);
console.log(tailPath);
const stringArray = new Set(tailPath.map(JSON.stringify));
console.log(stringArray);
console.log(`Tail visited: ${stringArray.size}`);
