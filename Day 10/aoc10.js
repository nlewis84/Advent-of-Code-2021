const { aoc_input } = require('../config');
const fs = require('fs');
const syntaxErrors = fs.readFileSync(`${aoc_input}`, 'utf-8').split('\n');

let score = 0;
let points = ['', 3, '', 57, '', 1197, '', 25137];
// console.log(syntaxErrors);

let isBalanced = (string) => {
  let brackets = '()[]{}<>';
  let stack = [];

  for (let bracket of string) {
    let bracketsIndex = brackets.indexOf(bracket);

    // console.log(bracketsIndex);

    if (bracketsIndex % 2 === 0) {
      stack.push(bracketsIndex + 1);
    } else {
      // console.log('closing bracket');
      if (stack.pop() !== bracketsIndex) {
        console.log(
          '****************************',
          brackets[bracketsIndex],
          '****************************'
        );
        score += points[bracketsIndex];

        return brackets[bracketsIndex];
      }
    }
  }
  // console.log(stack);
  console.log(stack.length !== 0);

  return stack.length === 0;
};

let part1 = (array) => {
  for (let string of array) {
    console.log(string);
    isBalanced(string);
  }
};

part1(syntaxErrors);
console.log(score);
