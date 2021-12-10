const { aoc_input } = require('../config');
const fs = require('fs');
const { clear } = require('console');
const heightMap = fs.readFileSync(`${aoc_input}`, 'utf-8').split('\n');
