const { aoc_input } = require('../config');
const fs = require('fs');
const lanternFishSchool = fs
	.readFileSync(`${aoc_input}`, 'utf-8')
	.split(',')
	.map((fish) => {
		return parseInt(fish);
	});

