"use strict";

const { dir, count } = require("console");
const fs = require("fs");
const { validateHeaderName } = require("http");
const { send, exit } = require("process");

const readFileLines = (filename) =>
  fs.readFileSync(filename).toString("UTF8").split("\n");

const arr = readFileLines("day8.txt");
const width = arr[0].length;
const height = arr.length;
console.log(`Dealing with a ${width}x${height} grid`);

// build an array of all tree positions
let position = [];
for (let i = 0; i < width; i++) {
  for (let j = 0; j < height; j++) {
    position.push([i, j]);
  }
}

// console.log(position);

// This is for Part 2
const checkLeft = function (pos) {
  let count = 0;
  const tree = arr[pos[0]][pos[1]];
  for (let i = pos[1] - 1; i >= 0; i--) {
    const checkTree = arr[pos[0]][i];
    if (checkTree < tree) {
      count++;
      continue;
    } else {
      count++;
      return count;
    }
  }
  return count;
};

const checkRight = function (pos) {
  let count = 0;
  const tree = arr[pos[0]][pos[1]];
  for (let i = pos[1] + 1; i < width; i++) {
    const checkTree = arr[pos[0]][i];
    if (checkTree < tree) {
      count++;
      continue;
    } else {
      count++;
      return count;
    }
  }
  return count;
};

const checkTop = function (pos) {
  let count = 0;
  const tree = arr[pos[0]][pos[1]];
  for (let i = pos[0] - 1; i >= 0; i--) {
    const checkTree = arr[i][pos[1]];
    if (checkTree < tree) {
      count++;
      continue;
    } else {
      count++;
      return count;
    }
  }
  return count;
};

const checkBottom = function (pos) {
  let count = 0;
  const tree = arr[pos[0]][pos[1]];
  for (let i = pos[0] + 1; i < height; i++) {
    const checkTree = arr[i][pos[1]];
    if (checkTree < tree) {
      count++;
      continue;
    } else {
      count++;
      return count;
    }
  }
  return count;
};

let bestTree = 0;
let bestPosition = "";
for (let i = 0; i < position.length; i++) {
  const treeScore =
    checkLeft(position[i]) *
    checkRight(position[i]) *
    checkTop(position[i]) *
    checkBottom(position[i]);
  if (treeScore > bestTree) {
    bestTree = treeScore;
    bestPosition = position[i];
  }
  //   console.log(`Position: ${position[i]} :: Count ${checkLeft(position[i])}`);
  //   console.log(`Position: ${position[i]} :: Count ${checkRight(position[i])}`);
  //   console.log(`Position: ${position[i]} :: Count ${checkTop(position[i])}`);
  //   console.log(`Position: ${position[i]} :: Count ${checkBottom(position[i])}`);
}
console.log(`Tree at ${bestPosition} scores ${bestTree}`);

/* This is all for Part 1

// build an array of all inner tree positions
// start with i=1, 2nd row
let position = [];
for (let i = 1; i < width - 1; i++) {
  for (let j = 1; j < height - 1; j++) {
    position.push([i, j]);
  }
}

// establish starting visible trees (along all edges)
let visibleCount = 2 * width + 2 * (height - 2);
console.log(`Visibile trees on edge: ${visibleCount}`);

const checkLeft = function (pos) {
  const tree = arr[pos[0]][pos[1]];
  for (let i = pos[1] - 1; i >= 0; i--) {
    const checkTree = arr[pos[0]][i];
    if (checkTree < tree) {
      continue;
    } else {
      return false;
    }
  }
  return true;
};

const checkRight = function (pos) {
  const tree = arr[pos[0]][pos[1]];
  for (let i = pos[1] + 1; i < width; i++) {
    const checkTree = arr[pos[0]][i];
    if (checkTree < tree) {
      continue;
    } else {
      return false;
    }
  }
  return true;
};

const checkTop = function (pos) {
  const tree = arr[pos[0]][pos[1]];
  for (let i = 0; i < pos[0]; i++) {
    const checkTree = arr[i][pos[1]];
    if (checkTree < tree) {
      continue;
    } else {
      return false;
    }
  }
  return true;
};

const checkBottom = function (pos) {
  const tree = arr[pos[0]][pos[1]];
  for (let i = pos[0] + 1; i < height; i++) {
    const checkTree = arr[i][pos[1]];
    if (checkTree < tree) {
      continue;
    } else {
      return false;
    }
  }
  return true;
};

// console.log(position);
for (let i = 0; i < position.length; i++) {
  if (
    checkLeft(position[i]) ||
    checkRight(position[i]) ||
    checkTop(position[i]) ||
    checkBottom(position[i])
  ) {
    console.log(`->Found Vis Tree: ${position[i]}`);
    visibleCount++;
  }
}

console.log(`Total visual trees: ${visibleCount}`);
*/
