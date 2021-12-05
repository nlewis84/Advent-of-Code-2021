const { aoc_input } = require('../config');
const fs = require('fs');
const [numbersCalled, ...boardsInput] = fs
	.readFileSync(`${aoc_input}`, 'utf-8')
	.split('\n\n')