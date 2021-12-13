const { aoc_input } = require('../config');
const fs = require('fs');
const octopuses = fs
  .readFileSync(`${aoc_input}`, 'utf-8')
  .split('\n')
  .map((item) => item.split(''))
  .map((item) => item.map((str) => parseInt(str)));

// console.log(octopuses);

// 1. Each one increases by one

// 2. Any octopus > 9 flashes making all adjacent octopuses add 1 (including diagonal)
// This can cause chain reactions, but a single octopus can only flash once per step

// 3. After that, all octopus that flashed get reset to 0

let numberOfFlashes = 0;

function increase(num) {
  let newNum;

  // console.log(num);
  newNum = num + 1;

  return newNum;
}

function replaceNumber(arr, num, row, col) {
  arr[row][col] = num;
}

function partOne(steps, arr) {
  // Step 1 : increase all the numbers
  let num;

  for (let i = 0; i < steps; i++) {
    for (let j = 0; j < arr.length; j++) {
      let row = arr[j];

      for (let k = 0; k < row.length; k++) {
        let col = row[k];

        // console.log(arr[j][k], j, k);
        num = increase(arr[j][k]);
        replaceNumber(arr, num, j, k);
      }
    }

    // console.table(arr);
    // Step 2 - Check for > 9
    while (
      arr
        .map((item) => item.some((item) => item > 9))
        .some((item) => item === true)
    ) {
      for (let j = 0; j < arr.length; j++) {
        let row = arr[j];

        for (let k = 0; k < row.length; k++) {
          let col = row[k];

          if (arr[j][k] > 9) {
            adjacent(arr, j, k);
          }
        }
      }
    }

    // console.table(arr);

    // Step 3 - Check for < 0
    for (let j = 0; j < arr.length; j++) {
      let row = arr[j];

      for (let k = 0; k < row.length; k++) {
        let col = row[k];

        if (arr[j][k] < 0) {
          arr[j][k] = 0; // Change flashed number to -1
          numberOfFlashes += 1;
        }
      }
    }

    if (
      arr
        .map((item) => item.every((item) => item === 0))
        .every((item) => item === true)
    ) {
      console.log('eureka!', 'step', i + 1);
    }
    // console.table(arr);
  }
}

function adjacent(arr, row, col) {
  let num;
  arr[row][col] = -9000; // Change flashed number to -1
  //   arr[row - 1][col - 1],   top left
  //   arr[row - 1][col],       top mid
  //   arr[row - 1][col + 1],   top right
  //   arr[row][col - 1],       left
  //   arr[row][col + 1],       right
  //   arr[row + 1][col - 1],   bottom left
  //   arr[row + 1][col],       bottom mid
  //   arr[row + 1][col + 1],   bottom right

  if (col === 0) {
    //don't do the left numbers
    num = increase(arr[row][col + 1]); // right
    replaceNumber(arr, num, row, col + 1);

    switch (row) {
      case 0:
        // console.log('top left corner');
        //don't do the top row
        num = increase(arr[row + 1][col]); // bottom mid
        replaceNumber(arr, num, row + 1, col);
        num = increase(arr[row + 1][col + 1]); // bottom right
        replaceNumber(arr, num, row + 1, col + 1);
        break;
      case arr.length - 1:
        // console.log('bottom left corner');
        //don't do the bottom row
        num = increase(arr[row - 1][col]); // top mid
        replaceNumber(arr, num, row - 1, col);
        num = increase(arr[row - 1][col + 1]); // top right
        replaceNumber(arr, num, row - 1, col + 1);
        break;
      default:
        // console.log('left side; strong side');
        num = increase(arr[row - 1][col]); // top mid
        replaceNumber(arr, num, row - 1, col);
        num = increase(arr[row - 1][col + 1]); // top right
        replaceNumber(arr, num, row - 1, col + 1);
        num = increase(arr[row + 1][col]); // bottom mid
        replaceNumber(arr, num, row + 1, col);
        num = increase(arr[row + 1][col + 1]); // bottom right
        replaceNumber(arr, num, row + 1, col + 1);
    }
  } else if (col === 9) {
    num = increase(arr[row][col - 1]); // left
    replaceNumber(arr, num, row, col - 1);

    switch (row) {
      case 0:
        // console.log('top right corner');
        num = increase(arr[row + 1][col - 1]); // bottom left
        replaceNumber(arr, num, row + 1, col - 1);
        num = increase(arr[row + 1][col]); // bottom mid
        replaceNumber(arr, num, row + 1, col);
        break;
      case arr.length - 1:
        // console.log('bottom right corner');
        num = increase(arr[row - 1][col - 1]); // top left
        replaceNumber(arr, num, row - 1, col - 1);
        num = increase(arr[row - 1][col]); // top mid
        replaceNumber(arr, num, row - 1, col);
        break;
      default:
        // console.log('right side; strong side');
        num = increase(arr[row - 1][col - 1]); // top left
        replaceNumber(arr, num, row - 1, col - 1);
        num = increase(arr[row - 1][col]); // top mid
        replaceNumber(arr, num, row - 1, col);
        num = increase(arr[row + 1][col - 1]); // bottom left
        replaceNumber(arr, num, row + 1, col - 1);
        num = increase(arr[row + 1][col]); // bottom mid
        replaceNumber(arr, num, row + 1, col);
        break;
    }
  } else {
    num = increase(arr[row][col - 1]); // left
    replaceNumber(arr, num, row, col - 1);
    num = increase(arr[row][col + 1]); // right
    replaceNumber(arr, num, row, col + 1);

    switch (row) {
      case 0:
        // console.log("don't do the top row");
        num = increase(arr[row + 1][col - 1]); // bottom left
        replaceNumber(arr, num, row + 1, col - 1);
        num = increase(arr[row + 1][col]); // bottom mid
        replaceNumber(arr, num, row + 1, col);
        num = increase(arr[row + 1][col + 1]); // bottom right
        replaceNumber(arr, num, row + 1, col + 1);
        break;
      case arr.length - 1:
        // console.log("don't do the bottom row");
        num = increase(arr[row - 1][col - 1]); // top left
        replaceNumber(arr, num, row - 1, col - 1);
        num = increase(arr[row - 1][col]); // top mid
        replaceNumber(arr, num, row - 1, col);
        num = increase(arr[row - 1][col + 1]); // top right
        replaceNumber(arr, num, row - 1, col + 1);
        break;
      default:
        // console.log('do all the things');
        num = increase(arr[row - 1][col - 1]); // top left
        replaceNumber(arr, num, row - 1, col - 1);
        num = increase(arr[row - 1][col]); // top mid
        replaceNumber(arr, num, row - 1, col);
        num = increase(arr[row - 1][col + 1]); // top right
        replaceNumber(arr, num, row - 1, col + 1);
        num = increase(arr[row + 1][col - 1]); // bottom left
        replaceNumber(arr, num, row + 1, col - 1);
        num = increase(arr[row + 1][col]); // bottom mid
        replaceNumber(arr, num, row + 1, col);
        num = increase(arr[row + 1][col + 1]); // bottom right
        replaceNumber(arr, num, row + 1, col + 1);
        break;
    }
  }
}

// // This tests adjacent function
// adjacent(octopuses, 1, 1);
// console.log(octopuses);

partOne(1000, octopuses);
console.log(numberOfFlashes);
