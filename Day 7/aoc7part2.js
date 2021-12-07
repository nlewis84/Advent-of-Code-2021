const { aoc_input } = require('../config');
const fs = require('fs');
const crabs = fs
	.readFileSync(`${aoc_input}`, 'utf-8')
	.split(',')
	.map((num) => {
		return parseInt(num);
	});

let fuelCost = Number.MAX_VALUE;
let min = Math.min(...crabs);
let max = Math.max(...crabs);

// Triangular Numbers!
function getNewFuelCost(distance) {
	let additionalCostArray = [ 0 ];

	for (let i = 1; i <= distance; i++) {
		additionalCostArray.push(i)
	}

	return additionalCostArray.reduce((prevCost, curCost) => prevCost + curCost);
}

function part2() { 
	let bestPosition = 0;

	for (let i = min; i <= max; i++) {
		let requiredFuel = crabs.reduce((fuel, crabPosition) => {
			let distance = Math.abs(i - crabPosition);
			let necessaryFuelForCrab = getNewFuelCost(distance);

			return fuel + necessaryFuelForCrab;
		}, 0);

		if (requiredFuel < fuelCost) {
			fuelCost = requiredFuel;
			bestPosition = i;
		}
	}

	console.log({fuelCost, bestPosition})
	return {fuelCost, bestPosition};
}

part2()