const { aoc_input } = require('../config');
const fs = require('fs');
const heightMap = fs
  .readFileSync(`${aoc_input}`, 'utf-8')
  .split(' | ')
  .map((pattern) => {
    return pattern.split('\n');
  })
  .flat()
  .map((pattern) => {
    return pattern.split(' ');
  });

console.log(heightMap);
