const { aoc_input } = require('../config');
const fs = require('fs');
// const { dir } = require('console');
const [template, input] = fs
  .readFileSync(`${aoc_input}`, 'utf-8')
  .split('\n\n');
const insertionRules = input.split('\n');

let rules = {};
for (let i = 0; i < insertionRules.length; i++) {
  const [pair, single] = insertionRules[i].split(' -> ');
  rules[pair] = single;
}

function doesThisPairExist(object, key, num) {
  const amount = num === undefined ? 1 : num;

  if (key in object) {
    object[key] += amount;
  } else {
    object[key] = amount;
  }
  return object;
}

// check to see if any of the rules apply
function polymerize(pairs) {
  let result = {};
  for (let pair in pairs) {
    const insert = rules[pair];

    doesThisPairExist(result, pair[0] + insert, pairs[pair]);
    doesThisPairExist(result, insert + pair[1], pairs[pair]);
  }
  return result;
}

// count the intial pairs from the template
let pairs = template
  .split('')
  .map((item, i, arr) => item + arr[i + 1])
  .slice(0, -1) // get rid of undefined at the end
  .reduce((obj, v) => doesThisPairExist(obj, v), {});

polymerize(pairs);

for (let i = 0; i < 10; i++) pairs = polymerize(pairs);

let letterCount = {};

// add up all letters from all pairs
for (let pair in pairs) {
  doesThisPairExist(letterCount, pair[0], pairs[pair]);
  doesThisPairExist(letterCount, pair[1], pairs[pair]);
}

const firstletter = template[0];
const lastletter = template[template.length - 1];

letterCount[firstletter] -= 1;
letterCount[lastletter] -= 1;

for (let letter in letterCount) {
  letterCount[letter] /= 2;
}

letterCount[firstletter] += 1;
letterCount[lastletter] += 1;

const sortedLetterCount = Object.values(letterCount).sort((a, b) => a - b);

console.log(letterCount);
console.log(sortedLetterCount.pop() - sortedLetterCount.shift());
