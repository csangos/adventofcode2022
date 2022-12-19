"use strict";

const { dir, count } = require("console");
const fs = require("fs");
const { validateHeaderName } = require("http");
const { send, exit } = require("process");

const readFileLines = (filename) =>
  fs.readFileSync(filename).toString("UTF8").split("\n");

const arr = readFileLines("data14.txt");

const solids = [];
const sand = [500, 0];
let depth = 0;
let sandCounter = 0;
let abyss = false;

// Split elements by ->
const line = arr.map((value) => value.split(" -> "));
console.log(line);
// Mark the stones as solids in our Set
for (let i = 0; i < line.length; i++) {
  const locations = line[i].map((item) => item.split(","));
  solids.push([Number(locations[0][0]), Number(locations[0][1])]);
  for (let j = 0; j < locations.length - 1; j++) {
    const x1 = Number(locations[j][0]);
    const x2 = Number(locations[j + 1][0]);
    const y1 = Number(locations[j][1]);
    const y2 = Number(locations[j + 1][1]);
    if (depth < y1) depth = y1;
    if (depth < y2) depth = y2;
    if (y1 < y2) {
      for (let k = 1; k <= y2 - y1; k++) {
        solids.push([x1, y1 + k]);
      }
    } else if (x1 > x2) {
      for (let k = 1; k <= x1 - x2; k++) {
        solids.push([x1 - k, y1]);
      }
    } else if (y2 < y1) {
      for (let k = 1; k <= y1 - y2; k++) {
        solids.push([x1, y1 - k]);
      }
    } else if (x2 > x1) {
      for (let k = 1; k <= x2 - x1; k++) {
        solids.push([x1 + k, y1]);
      }
    }
  }
}
depth += 2;

// Function to check if the given location is in the solid list
const inSolids = function (x, y) {
  if (y >= depth) return true;
  //   console.log("Y", y, "Depth", depth);
  for (let i = 0; i < solids.length; i++) {
    if (solids[i][0] === x && solids[i][1] === y) return true;
  }
  return false;
};

// Function to move sand one location, checking for depth or stopped
const dropSand = function () {
  let stopped = false;
  while (!stopped && !inSolids(500, 0)) {
    // can it keep falling down?
    if (!inSolids(sand[0], sand[1] + 1)) {
      sand[1]++;
      // can it fall left and down?
    } else if (!inSolids(sand[0] - 1, sand[1] + 1)) {
      sand[0]--;
      sand[1]++;
      // can it fall right and down?
    } else if (!inSolids(sand[0] + 1, sand[1] + 1)) {
      sand[0]++;
      sand[1]++;
      // then it is stopped
    } else {
      stopped = true;
      sandCounter++;
      solids.push([sand[0], sand[1]]);
    }
    // console.log(`New sand pos: ${sand}`);
  }
};
console.log("Floor ", depth);
// exit(0);
// console.log("Solids", solids);

while (!inSolids(500, 0)) {
  sand[0] = 500;
  sand[1] = 0;
  dropSand();
  //   console.log(solids);
  console.log(sandCounter);
  //   console.log("\n");
  //   if (sandCounter === 25) exit(0);
}
console.log(`Sand counter: ${sandCounter}`);
