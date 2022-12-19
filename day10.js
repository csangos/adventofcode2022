"use strict";

const { dir, count } = require("console");
const fs = require("fs");
const { validateHeaderName } = require("http");
const { send, exit } = require("process");

const readFileLines = (filename) =>
  fs.readFileSync(filename).toString("UTF8").split("\n");

const arr = readFileLines("data10.txt");

let cycle = 1;
let x = 1;
let sum = 0;
const firstCycle = 20;
const cycleFactor = 40;
const crt = [];
let crtTracker = 0;

const checkCycle = function () {
  if (cycle === firstCycle || (cycle - firstCycle) % cycleFactor === 0) {
    console.log(`X: ${x}`);
    console.log(`Cycle ${cycle}: ${x * cycle}`);
    sum += x * cycle;
  }
};

const drawSprite = function () {
  crtTracker = (cycle - 1) % cycleFactor;
  if (x >= crtTracker - 1 && x <= crtTracker + 1) {
    crt[cycle - 1] = "#";
  } else {
    crt[cycle - 1] = ".";
  }
  console.log(`Cycle: ${cycle}`);
  console.log(`X: ${x}`);
  console.log(`CRT Tracker: ${crtTracker}`);
  console.log(crt);
  console.log("\n");
};

for (let i = 0; i < arr.length; i++) {
  const line = arr[i].split(" ");
  console.log(line);
  if (line[0] == "noop") {
    drawSprite();
    cycle++;
    // then the line is "addx"
  } else {
    drawSprite();
    cycle++;
    drawSprite();
    cycle++;
    x += Number(line[1]);
  }
  //   if (cycle > 45) exit(0);
}

let message = "";
for (let j = 0; j < 6; j++) {
  for (let i = 0; i < 40; i++) {
    message += String(crt[j * 40 + i]);
  }
  message += "\n";
}

console.log(message);
