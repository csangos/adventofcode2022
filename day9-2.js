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
let ropePos = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];
let tailPath = [[0, 0]];
let result = [];

const printRope = function () {
  console.log(
    "** ",
    headPos,
    ropePos[0],
    ropePos[1],
    ropePos[2],
    ropePos[3],
    ropePos[4],
    ropePos[5],
    ropePos[6],
    ropePos[7],
    tailPos
  );
};

// Deal with head movement
const moveHead = function (dir, num) {
  console.log(`\nMove ${num} ${dir} `);
  for (let j = 1; j <= num; j++) {
    // console.log(`\nMove: ${j}`);
    switch (dir) {
      case "R":
        headPos[0]++;
        break;
      case "U":
        headPos[1]++;
        break;
      case "L":
        headPos[0]--;
        break;
      case "D":
        headPos[1]--;
        break;
    }
    result = moveTail([headPos[0], headPos[1]], [ropePos[0][0], ropePos[0][1]]);
    headPos[0] = result[0];
    headPos[1] = result[1];
    ropePos[0][0] = result[2];
    ropePos[0][1] = result[3];

    for (let k = 0; k <= 6; k++) {
      console.log(`k: ${k}`);
      result = moveTail(
        [ropePos[k][0], ropePos[k][1]],
        [ropePos[k + 1][0], ropePos[k + 1][1]]
      );
      ropePos[k][0] = result[0];
      ropePos[k][1] = result[1];
      ropePos[k + 1][0] = result[2];
      ropePos[k + 1][1] = result[3];
    }

    console.log("Deal with last knot");
    result = moveTail(ropePos[7], tailPos);
    ropePos[7][0] = result[0];
    ropePos[7][1] = result[1];
    tailPos[0] = result[2];
    tailPos[1] = result[3];
    tailPath.push([tailPos[0], tailPos[1]]);
    // console.log("TailPath: ", tailPath);
    console.log("\n");
  }
  //   printRope();
};

// Deal with Tail movement
const moveTail = function (one, two) {
  console.log("Move Tail: 1", one, " 2", two);
  const xDiff = one[0] - two[0];
  const yDiff = one[1] - two[1];
  if (Math.abs(xDiff === 2) && Math.abs(yDiff == 2)) {
    // console.log("Check this part of the sequence.");
    console.log(`XDiff: ${xDiff} YDiff: ${yDiff}`);
    // console.log(`One: ${one} Two: ${two}`);
    // console.log("Tailpath: ", tailPath);
  }
  //   console.log(`Diff: ${xDiff},${yDiff}``);

  // Diagonal check
  if (Math.abs(xDiff) >= 1 && Math.abs(yDiff) >= 1) {
    // console.log("move diagonal");
    // check up and to right
    if (
      (xDiff === 1 && yDiff > 1) ||
      (xDiff > 1 && yDiff === 1) ||
      (xDiff === 2 && yDiff === 2)
    ) {
      two[0]++;
      two[1]++;
      // check up and to left
    } else if (
      (xDiff < -1 && yDiff === 1) ||
      (xDiff === -1 && yDiff > 1) ||
      (xDiff === -2 && yDiff === 2)
    ) {
      two[0]--;
      two[1]++;
      // check down and left
    } else if (
      (xDiff === -1 && yDiff < -1) ||
      (xDiff < -1 && yDiff === -1) ||
      (xDiff === -2 && yDiff === -2)
    ) {
      two[0]--;
      two[1]--;
    } else if (
      (xDiff > 1 && yDiff === -1) ||
      (xDiff === 1 && yDiff < -1) ||
      (xDiff === 2 && yDiff === -2)
    ) {
      two[0]++;
      two[1]--;
    } else {
      //   console.log("Still within 1, do nothing.");
    }

    // Horizontal check
  } else if (Math.abs(xDiff) > 1) {
    // console.log("move horizontal");
    if (xDiff > 1) {
      two[0]++;
    } else {
      two[0]--;
    }

    // Vertical check
  } else if (Math.abs(yDiff) > 1) {
    // console.log("move vertical");
    if (yDiff > 1) {
      two[1]++;
    } else {
      two[1]--;
    }

    // Nothing to do
  } else {
    // console.log("Do nothing");
  }
  console.log("New Position: 1", one, " 2", two);
  return [one[0], one[1], two[0], two[1]];
};

for (let i = 0; i < arr.length; i++) {
  const move = arr[i].split(" ");
  moveHead(move[0], move[1]);
}

console.log("H:T", headPos, ":", tailPos);
const stringArray = new Set(tailPath.map(JSON.stringify));
console.log("TailPath: ", stringArray);
console.log(`Tail visited: ${stringArray.size}`);
