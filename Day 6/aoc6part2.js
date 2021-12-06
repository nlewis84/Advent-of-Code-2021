const { aoc_input } = require('../config');
const fs = require('fs');
const lanternFishSchool = fs
	.readFileSync(`${aoc_input}`, 'utf-8')
	.trim()
	.split(',')
	.map((fish) => {
		return parseInt(fish);
	});

// lanternFish create a new lanternFish every 7 days (count down from 6 to 0)
// a new lanternFish needs 9 days to create a new lanternFish
// not all lanternFish start at 6, so count down to 0, then reset to 6 on next iteration, then create a new lanternFish with a timer of 8

const days = 256;

// break the input into 5 different arrays to get past javascript limitation of array length of 4294967296
// or try categorizing all by their day number and tracking that way

const executeOrder66 = (fishCount) => {
	const newFishCount = fishCount.shift()

	// Move [0] fish to [8] --- these are new fish
	fishCount.push(newFishCount)

	// Move [0] fish to [6] --- these are old fish, restarting their cycle
	fishCount[6] += newFishCount

	return fishCount
}

const solvePart2 = () => {
	// Count all the fish, and put them into their own index of an array
	let fishCount = Array(9).fill().map((_, i) => {
		return lanternFishSchool.filter(x => x === i).length
	})

	for (let i = 0; i < days; i++) {
		fishCount = executeOrder66(fishCount)
	}

	// add up all the fish!
	const numFishes = fishCount.reduce((a, x) => a + x, 0)

	console.log(numFishes)

	return numFishes
}

solvePart2();