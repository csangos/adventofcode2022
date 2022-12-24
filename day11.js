"use strict";

const { dir, count } = require("console");
const fs = require("fs");
const { validateHeaderName } = require("http");
const { send, exit } = require("process");

const readFileLines = (filename) =>
  fs.readFileSync(filename).toString("UTF8").split("\n");

const arr = readFileLines("data11.txt");

/*
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3
*/

const monkeys = [];
let divArray = [];
let lcm = 1;
for (let i = 0; i < arr.length; i += 7) {
  const monkeyNumber = Number(arr[i].trim().split(" ")[1][0]);
  const monkeyItems = arr[i + 1].trim().split(":")[1].split(", ");
  for (let x = 0; x < monkeyItems.length; x++) {
    monkeyItems[x] = Number(monkeyItems[x]);
  }
  const monkeyOp = arr[i + 2].trim().split(" ")[4];
  const monkeyVal = Number(arr[i + 2].trim().split(" ")[5]);
  const monkeyDiv = Number(arr[i + 3].trim().split(/[ ]+/)[3]);
  divArray.push(monkeyDiv);
  const monkeyTrue = Number(arr[i + 4].trim().split(" ")[5]);
  const monkeyFalse = Number(arr[i + 5].trim().split(" ")[5]);
  monkeys.push({
    number: monkeyNumber,
    items: monkeyItems,
    div: monkeyDiv,
    op: monkeyOp,
    val: isNaN(monkeyVal) ? "itself" : monkeyVal,
    t: monkeyTrue,
    f: monkeyFalse,
    count: 0,
  });
}

const monkeybiz = function () {
  let recMonkey = 0;
  for (let m = 0; m < monkeys.length; m++) {
    while (monkeys[m].items.length != 0) {
      monkeys[m].count++;
      let value =
        monkeys[m].val == "itself" ? monkeys[m].items[0] : monkeys[m].val;
      monkeys[m].items[0] =
        monkeys[m].op == "*"
          ? // The 2 lines below are for Part 1, the next 2 are for Part 2
            //   ? Math.trunc((monkeys[m].items[0] * value) / 3)
            //   : Math.trunc((monkeys[m].items[0] + value) / 3);
            Math.trunc((monkeys[m].items[0] * value) % lcm)
          : Math.trunc((monkeys[m].items[0] + value) % lcm);
      if (monkeys[m].items[0] % monkeys[m].div === 0) {
        recMonkey = monkeys[m].t;
        // monkeys[m].items[0] = min;
      } else {
        recMonkey = monkeys[m].f;
        // monkeys[m].items[0] = min;
      }
      monkeys[recMonkey].items.push(monkeys[m].items.shift());
    }
  }
};

const findLCM = function () {
  console.log(divArray);
  for (let z = 0; z < divArray.length; z++) {
    lcm *= divArray[z];
  }
};

findLCM();
console.log(lcm);
for (let i = 0; i < 10000; i++) {
  console.log(`Round ${i + 1}`);
  monkeybiz();
}
console.log(monkeys);
