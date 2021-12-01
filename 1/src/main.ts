import * as fs from "fs";
import * as path from "path";

const data = fs.readFileSync(path.join(__dirname, "../input.txt"), "utf-8");

const numbers = data
  .trim()
  .split("\n")
  .map((num) => parseInt(num));

const partOne = () => {
  let prev = null;
  let counter = 0;

  for (let num of numbers) {
    if (prev === null) {
      prev = num;

      continue;
    }

    if (prev < num) {
      counter += 1;
    }

    prev = num;
  }

  console.log(counter);
};

const partTwo = () => {
  const windows = [];

  for (let i = 0; i < numbers.length - 2; i++) {
    windows.push([numbers[i], numbers[i + 1], numbers[i + 2]]);
  }

  let prev = null;
  let counter = 0;

  for (let win of windows) {
    const sum = win.reduce((acc, val) => acc + val);

    if (prev === null) {
      prev = sum;

      continue;
    }

    if (prev < sum) {
      counter += 1;
    }

    prev = sum;
  }

  console.log(counter);
};
