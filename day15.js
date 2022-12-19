"use strict";

const { dir, count } = require("console");
const fs = require("fs");
const { validateHeaderName } = require("http");
const { send, exit } = require("process");

const readFileLines = (filename) =>
  fs.readFileSync(filename).toString("UTF8").split("\n");

const arr = readFileLines("data15.txt");

const sensors = [];
const beacons = [];
const confirmed = [];
const lineFocus = 2000000;

const isConfirmed = function (x, y) {
  for (let i = 0; i < confirmed.length; i++) {
    if (confirmed[i][0] === x && confirmed[i][1] === y) return true;
  }
  return false;
};

// Sensor at x=2, y=18: closest beacon is at x=-2, y=15
// Get sensor and beacon coordinates from each line
for (let i = 0; i < arr.length; i++) {
  const sX = Number(
    arr[i].split(":")[0].split("at ")[1].split(",")[0].split("=")[1]
  );
  const sY = Number(
    arr[i].split(":")[0].split("at ")[1].split(",")[1].split("=")[1]
  );
  const bX = Number(
    arr[i].split(":")[1].split("at ")[1].split(",")[0].split("=")[1]
  );
  const bY = Number(
    arr[i].split(":")[1].split("at ")[1].split(",")[1].split("=")[1]
  );
  sensors.push([sX, sY]);
  confirmed.push([sX, sY, "S"]);
  beacons.push([bX, bY]);
  confirmed.push([bX, bY, "B"]);
}

// For each sensor, calculate the manhattan distance (md) to the closest beacon
// Using the md, mark all surrounding spaces within md as empty, except for the beacon space
console.log(`Sensors: ${sensors.length}`);
for (let i = 0; i < sensors.length; i++) {
  const md =
    Math.abs(sensors[i][0] - beacons[i][0]) +
    Math.abs(sensors[i][1] - beacons[i][1]);
  console.log(`Manhattan distance: ${md}`);
  const sat = sensors[i];
  confirmed.push[(sat[0], sat[1], "S")];
  const sX = sensors[i][0];
  const sY = sensors[i][1];
  console.log(`Sensor: ${sX} ${sY}`);

  // Find every sat would scan some portion of line 10
  if (lineFocus >= sY - md && lineFocus <= sY + md) {
    console.log(`!!${sX},${sY} does scan ${lineFocus}`);
    const offset = md - Math.abs(lineFocus - sY);
    for (let x = -offset; x <= offset; x++) {
      //   if (!isConfirmed(sX + x, lineFocus)) {
      // console.log(`Pushed: [${sX + x}, ${lineFocus}]`);
      confirmed.push([sX + x, lineFocus, "#"]);
      //   }
    }
  }
}

/*
  // Lower left corner
  console.log(`LL: ${i}`);
  let offset = 0;
  for (let y = 0; y > -md; y--) {
    for (let x = -md + offset; x < 0; x++) {
      //   console.log(`X: ${x} Y: ${y}`);
      if (!isConfirmed(sX + x, sY + y)) {
        confirmed.push([sX + x, sY + y, "#"]);
      }
    }
    offset++;
  }

  // Lower right corner
  console.log(`LR: ${i}`);
  offset = 0;
  for (let x = 0; x < md; x++) {
    for (let y = -md + offset; y < 0; y++) {
      //   console.log(`X: ${x} Y: ${y}`);
      if (!isConfirmed(sX + x, sY + y)) {
        confirmed.push([sX + x, sY + y, "#"]);
      }
    }
    offset++;
  }

  // Upper right corner
  console.log(`UR: ${i}`);
  offset = 0;
  for (let y = 0; y <= md; y++) {
    for (let x = md - offset; x > 0; x--) {
      //   console.log(`X: ${x} Y: ${y}`);
      if (!isConfirmed(sX + x, sY + y)) {
        confirmed.push([sX + x, sY + y, "#"]);
      } else {
        // console.log("skip", sX + x, sY + y);
      }
    }
    offset++;
  }

  // Lower right corner
  console.log(`UL: ${i}`);
  offset = 0;
  for (let x = 0; x > -md; x--) {
    for (let y = md - offset; y > 0; y--) {
      //   console.log(`X: ${x} Y: ${y}`);
      if (!isConfirmed(sX + x, sY + y)) {
        confirmed.push([sX + x, sY + y, "#"]);
      }
    }
    offset++;
  }
  */

// Filter for specifc line
function getLine(line) {
  return line[1] === lineFocus && line[2] === "#";
}

function getLineSB(line) {
  return line[1] === lineFocus && (line[2] === "B" || line[2] === "S");
}

console.log(confirmed);
console.log(`Cleared ${confirmed.length} locations.`);
const filter = confirmed.filter(getLine);
const sb = confirmed.filter(getLineSB);
// console.log(sb);
// console.log(filter);
const answer = new Map(filter);
const answer2 = new Map(sb);

// console.log(answer);
console.log(`Answer: ${answer.size - answer2.size}`);
