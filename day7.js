"use strict";

const { dir } = require("console");
const fs = require("fs");
const { send, exit } = require("process");

const readFileLines = (filename) =>
  fs.readFileSync(filename).toString("UTF8").split("\n");

const arr = readFileLines("day7.txt");

const maxSize = 100000;
// Tree format DIR: type, name, parentIndex, ownIndex
// Tree format FILE: type, name, size, parentIndex
let treeIndex = 2;
const tree = [["dir", "/", "", 1]];
// parent is an array of parent directory indexs
let parent = [1];

// Start with i=1; as i=0 is the cd / — so the top of the dir structure
for (let i = 1; i < arr.length; i++) {
  const currrentParent = parent[parent.length - 1];
  const command = arr[i].split(" ");
  //   console.log(`Command: ${command}`);
  if (arr[i][0] == "$") {
    if (command[1] == "ls") {
      //   console.log(`i: ${i} : Processing LS line: ${command}`);
    } else if (command[1] == "cd") {
      //   console.log(`i: ${i} : Processing CD line: ${command}`);
      if (command[2] == "..") {
        parent.pop();
      } else {
        const getItem = tree.find(function (item) {
          return item[2] === currrentParent && item[1] === command[2];
        });
        parent.push(getItem[3]);
      }
      //   console.log("Parent", parent);
    }
  } else {
    // console.log(`i: ${i} : Processing D/F line: ${command}`);
    if (command[0] == "dir") {
      tree.push(["dir", command[1], currrentParent, treeIndex++]);
    } else {
      tree.push(["file", command[1], Number(command[0]), currrentParent]);
    }
  }
}
console.log("***END OF FILE***");
// console.log(`Parent: ${parent}`);
console.log("Tree: ", tree);

const calcSize = function (folder, folderIndex) {
  //   console.log(`Calculating size of folder: ${folder}`);
  let size = 0;
  const subTree = tree.filter(function (node) {
    // console.log(`node: ${node} :  ${this}`);
    return (
      (node[0] === "dir" && node[2] === this) ||
      (node[0] === "file" && node[3] === this)
    );
  }, folderIndex);
  //   console.log(`Length of subTree: ${subTree.length}`);
  //   console.log(subTree);
  for (let i = 0; i < subTree.length; i++) {
    if (subTree[i][0] === "file") {
      //   console.log(`Adding file ${subTree[i][1]}: ${subTree[i][2]}`);
      size += subTree[i][2];
    } else {
      size += calcSize(subTree[i][1], subTree[i][3]);
    }
  }
  //   console.log(`size: ${size}`);
  return size;
};

const dirs = tree.filter(function (node) {
  return node[0] === "dir";
});

console.log("Dirs: ", dirs);

let answer = 0;
let dirList = [];
let rootDirSize = 0;
for (let i = 0; i < dirs.length; i++) {
  const dirSize = calcSize(dirs[i][1], dirs[i][3]);
  if (dirs[i][1] === "/") {
    rootDirSize = dirSize;
  }
  if (dirSize <= maxSize) {
    answer += dirSize;
  }
  console.log(`Dir ${dirs[i][1]} size: ${dirSize}`);
  dirList.push([dirs[i][1], dirSize]);
}

console.log(`** Part 1 Answer: ${answer}`);

// Part 2
const diskSpace = 70000000;
const freeSpace = diskSpace - rootDirSize;
const needSpace = 30000000 - freeSpace;
console.log(`Free ${freeSpace} space.`);
console.log(`Needed space: ${needSpace}`);

const sortedDirs = dirList.sort(function (a, b) {
  return a[1] - b[1];
});
console.log(dirList);
console.log(sortedDirs);

const answer2 = sortedDirs.find(function (item) {
  return item[1] > needSpace;
});
console.log(
  `Answer 2: The dir to delete is ${answer2[0]}, with ${answer2[1]} space.`
);
