
const fs = require('fs');
const lines = fs
	.readFileSync(`${__dirname}/input`, 'utf-8')
	.split('\n')
	.map(num => Number.parseInt(num));

console.log(lines);

