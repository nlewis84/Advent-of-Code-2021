const { aoc_input } = require('../config');
const fs = require('fs');
const input = fs
	.readFileSync(`${aoc_input}`, 'utf-8')
	.split(' | ')
	.map((pattern) => {
		return pattern.split('\n')
	})
	.flat()
	.map((pattern) => {
		return pattern.split(' ')
	})

// console.log(input)

const signalPatterns = input.filter((pattern, i) => {
	return i % 2 === 0;
})

// console.log(signalPatterns)

const digitalOutput = input.filter((pattern, i) => {
	return i % 2 === 1;
})

console.log(digitalOutput.flat())
// 1, 4, 7 and 8 are the easy ones : 1 = 2 segments, 4 = 4seg, 7 = 3seg, 8 = 7seg

const signalPatternsOrdered = signalPatterns.sort((a,b) => a.length - b.length);

// console.log(signalPatternsOrdered)

let sortedDigitalOutput = digitalOutput.flat().filter(item => item.length === 2 || item.length === 3 || item.length === 4 || item.length === 7)

console.log(sortedDigitalOutput.length)