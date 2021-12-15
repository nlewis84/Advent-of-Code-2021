const { aoc_input } = require('../config');
const fs = require('fs');
// const { dir } = require('console');
const [template, input] = fs
  .readFileSync(`${aoc_input}`, 'utf-8')
  .split('\n\n');
const insertionRules = input.split('\n');
