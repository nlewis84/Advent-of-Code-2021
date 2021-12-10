const { aoc_input } = require('../config');
const fs = require('fs');
const syntaxErrors = fs.readFileSync(`${aoc_input}`, 'utf-8').split('\n');

let score = 0;
let points = ['', 1, '', 2, '', 3, '', 4];
let discard = false;
let allScores = [];
// console.log(syntaxErrors);

let needsCompleting = (string) => {
  let brackets = '()[]{}<>';
  let stack = [];
  let completionStringArray = [];
  score = 0;

  for (let bracket of string) {
    let bracketsIndex = brackets.indexOf(bracket);

    // console.log(bracketsIndex);

    if (bracketsIndex % 2 === 0) {
      stack.push(bracketsIndex + 1);
      // console.log('even', stack);
    } else {
      // console.log('odd', stack.pop(), bracketsIndex);
      stack.pop();
      // if (stack.pop() !== bracketsIndex) {
      // console.log(
      //   '****************************',
      //   'adding a bracket!',
      //   '****************************'
      // );
      //     score += points[bracketsIndex];
      //     return brackets[bracketsIndex];
      // }
    }
  }
  // console.log(stack);
  let newStack = [];
  // console.log(stack.length !== 0);
  for (let i = stack.length - 1; i >= 0; i--) {
    newStack.push(stack[i]);
  }

  console.log(newStack);

  for (let i = 0; i < newStack.length; i++) {
    const element = newStack[i];
    score = score * 5 + points[element];
  }
  console.log(score);

  allScores.push(score);

  allScores.sort((a, b) => a - b);
  console.log(allScores[Math.floor((allScores.length - 1) / 2)]);

  return allScores;
};

let part2 = (array) => {
  // console.log(array);
  for (let string of array) {
    // console.log(string);
    needsCompleting(string);
  }
};

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
        // console.log(
        //   '****************************',
        //   brackets[bracketsIndex],
        //   '****************************'
        // );
        // score += points[bracketsIndex];
        discard = true;
        return brackets[bracketsIndex];
      }
    }
  }
  // console.log(stack);
  // console.log(stack.length !== 0);

  return stack.length === 0;
};

// this is now the input minus any corrupted strings
let part1 = (array) => {
  let discardArr = [];

  for (let string of array) {
    discard = false;
    // console.log(string);
    isBalanced(string);

    if (discard) {
      // console.log('discard this one', array[array.indexOf(string)]);
      // array.splice(array.indexOf(string), 1);
      discardArr.push(array.indexOf(string));
      // console.log(
      //   'array is now',
      //   discardArr.length,
      //   'indices',
      //   'string to discard is',
      //   string,
      //   array[array.indexOf(string)],
      //   array.indexOf(string)
      // );
    }
  }
  // console.log(discardArr);

  // console.log(array);

  discardArr = discardArr.sort((a, b) => b - a);
  // console.log(discardArr);

  for (let i = 0; i < discardArr.length; i++) {
    const element = discardArr[i];
    // console.log(element);
    array.splice(element, 1);
  }

  console.log(array);
  part2(array);
};

part1(syntaxErrors);
