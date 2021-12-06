const { aoc_input } = require('../config');
const fs = require('fs');
const input = fs
	.readFileSync(`${aoc_input}`, 'utf-8')
	.split('\n')
	.map((line) => {
		const [x1, y1, x2, y2] = line.matchAll(/\d+/g);
		return [[parseInt(x1), parseInt(y1)], [parseInt(x2), parseInt(y2)]];
	});

// console.log(input);
// console.log(input[0].startY === input[0].endY) // save this as the constant coordinate
// console.log(input[0].startX - input[0].endX < 0) // You want this to be negative, then increment the first coordinate...find the smallest...Math.min

function isHorizontalLine(line) {
	const [ start, end ] = line;
	const [, y1] = start;
	const [, y2] = end;

	return y1 === y2;
}

function isVerticalLine(line) {
	const [ start, end ] = line;
	const [x1] = start;
	const [x2] = end;

	return x1 === x2;
}

const oceanFloor = {};

console.log(input)

// // Part 1
const orthagonalLines = input.filter(line => (isHorizontalLine(line) || isVerticalLine(line)));
// console.log(orthagonalLines)
// for (const line of orthagonalLines) {
// // Part 2
for (const line of input) {
	let [[x1, y1], [x2, y2]] = line;
	if (isHorizontalLine(line)) {
		let start = Math.min(x1, x2);
		let end = Math.max(x1, x2);

		for (let i = start; i <= end; i++) {
			let key = `${i},${y1}`;
			if (oceanFloor[key]) {
				oceanFloor[key] += 1;
			} else {
				oceanFloor[key] = 1;
			}
		}
	} else if (isVerticalLine(line)) {
		let start = Math.min(y1, y2);
		let end = Math.max(y1, y2);

		for (let i = start; i <= end; i++) {
			let key = `${x1},${i}`;
			if (oceanFloor[key]) {
				oceanFloor[key] += 1;
			} else {
				oceanFloor[key] = 1;
			}
		}
	} else {
		// console.log("Diagonal!");
		// console.log(x1, y1, x2, y2);
		// console.log(Math.abs(x1 - x2))
		// Determine the direction of the lines
		let increaseX = (x1 < x2) ? 1 : -1;
		let increaseY = (y1 < y2) ? 1 : -1;
		// console.log(increaseY, increaseX);
		// Determine length of line for iteration below
		let lineLength = Math.abs(x1 - x2);
		// console.log(lineLength)
		for (let i = 0; i <= lineLength; i++) {
			let x = x1 + i * increaseX;
			let y = y1 + i * increaseY;

			let key = `${x},${y}`;
			if (oceanFloor[key]) {
				oceanFloor[key] += 1;
			} else {
				oceanFloor[key] = 1;
			}
		}
	}
}

// console.log(oceanFloor);

const sumOfOverlaps = Object
	.values(oceanFloor)
	.filter(count => count > 1)
	.length;
console.log(sumOfOverlaps);
