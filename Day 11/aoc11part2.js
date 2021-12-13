const { aoc_input } = require('../config');
const fs = require('fs');
const octopuses = fs.readFileSync(`${aoc_input}`, 'utf-8').split('\n');

console.log(octopuses);
