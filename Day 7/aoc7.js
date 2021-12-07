const { aoc_input } = require('../config');
const fs = require('fs');
const crabs = fs
	.readFileSync(`${aoc_input}`, 'utf-8')
	.split(',')
	.map((num) => {
		return parseInt(num);
	});

// console.log(crabs)

let fuelCost = Number.MAX_VALUE;
let min = Math.min(...crabs);
let max = Math.max(...crabs);

// console.log(min, max)

function part1() { 
	let bestPosition = 0;

	for (let i = min; i <= max; i++) {
		let requiredFuel = crabs.reduce((fuel, crabPosition) => {
			// console.log("fuel", fuel, "position", crabPosition)
			let necessaryFuelForCrab = Math.abs(i - crabPosition);
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

part1()