const { aoc_input } = require('../config');
const fs = require('fs');
const lanternFishSchool = fs
	.readFileSync(`${aoc_input}`, 'utf-8')
	.split(',')
	.map((fish) => {
		return parseInt(fish);
	});

// lanternFish create a new lanternFish every 7 days (count down from 6 to 0)
// a new lanternFish needs 9 days to create a new lanternFish
// not all lanternFish start at 6, so count down to 0, then reset to 6 on next iteration, then create a new lanternFish with a timer of 8

let days = 80;

for (let i = 0; i < days; i++) {
	// console.log(lanternFishSchool);
	for (let j = 0; j < lanternFishSchool.length; j++) {
		if (lanternFishSchool[j] === 0) {
			lanternFishSchool[j] = 6;
			lanternFishSchool.push(9);
		} else {
			lanternFishSchool[j] -= 1;
		}
		// console.log(lanternFishSchool[j]);
	}
}

console.log(lanternFishSchool.length);