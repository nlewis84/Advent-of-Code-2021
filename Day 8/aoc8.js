const { aoc_input } = require('../config');
const fs = require('fs');
const crabs = fs
	.readFileSync(`${aoc_input}`, 'utf-8')
	.split(',')
	.map((num) => {
		return parseInt(num);
	});

