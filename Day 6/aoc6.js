const { aoc_input } = require('../config');
const fs = require('fs');
const input = fs
	.readFileSync(`${aoc_input}`, 'utf-8')
	.split('\n')
	.map((line) => {
		const [x1, y1, x2, y2] = line.matchAll(/\d+/g);
		return [[parseInt(x1), parseInt(y1)], [parseInt(x2), parseInt(y2)]];
	});

console.log(input);