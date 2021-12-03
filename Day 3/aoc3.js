const fs = require('fs');
const lines = fs
	.readFileSync(`.input`, 'utf-8')
	.split('\n')

	
const testArray = [
	'00100', 
	'11110', 
	'10110', 
	'10111', 
	'10101', 
	'01111', 
	'00111', 
	'11100', 
	'10000', 
	'11001', 
	'00010', 
	'01010'
];

// console.log(testArray);

// Part 1
let gammaRate = '';
let epsilonRate = '';
let powerConsumption;

// Part 2
let lifeSupportRating;
let oxygenGeneratorRating;
let co2ScrubberRating;

function computeGammaRate(array) {
	for(let i = 0; i < array[0].length; i++){
		let zeroes = 0;
		let ones = 0;

		for(let j = 0; j < array.length; j++){
			array[j][i] === '1' ? ones++ : zeroes++;

			if (j === array.length - 1) {
				ones > zeroes ? gammaRate += '1' : gammaRate += '0';
				// console.log("New Gamma Rate is: ", gammaRate);
			}
		}
		
		if (i === array[0].length - 1) {
			// console.log(" ");
			// console.log("Finished computing Gamma Rate!");
		}
	}
} 

function computerEpsilonRate(string) {
	let answer = '';

	for(let i = 0; i < string.length; i++){
		string[i] === '1' ? answer += '0' : answer += '1'
		// console.log("New Epsilon Rate is: ", answer);
	}

	epsilonRate = answer;

	// console.log(" ");
	// console.log("Finished computing Epsilon Rate!");
	// console.log(" ");
}

function binaryToDecimal(string) {
	return parseInt(string, 2);
}

// // Test Array computation
// computeGammaRate(testArray);
computeGammaRate(lines);
computerEpsilonRate(gammaRate);
gammaRate = binaryToDecimal(gammaRate);
epsilonRate = binaryToDecimal(epsilonRate);
powerConsumption = gammaRate * epsilonRate;


function computeOxygenGeneratorRating(array) {
	let answer = '';
	let escapeValve = '';
	
	for(let i = 0; i < array[0].length; i++){
		let zeroes = 0;
		let ones = 0;
		let numberOfItems = 0;
		
		for(let j = 0; j < array.length; j++){
			if (array[j].startsWith(answer)) { 
				numberOfItems++
				
				if (numberOfItems === 1) { escapeValve = array[j] };
				array[j][i] === '1' ? ones++ : zeroes++; 
			}
			
			if (j === array.length - 1) {
				if (numberOfItems === 1) { oxygenGeneratorRating = escapeValve; break; }
				ones >= zeroes ? answer += '1' : answer += '0';
			}
		}
		
		if (i === array[0].length - 1) {
			if (oxygenGeneratorRating !== escapeValve) { oxygenGeneratorRating = answer; }
			// console.log(" ");
			// console.log("Finished computing O2 Generator Rating!");
			// console.log(" ");
		}
	}
} 

function computeCO2GeneratorRating(array) {
	let answer = '';
	let escapeValve = '';
	
	for(let i = 0; i < array[0].length; i++){
		let zeroes = 0;
		let ones = 0;
		let numberOfItems = 0;
		
		for(let j = 0; j < array.length; j++){
			if (array[j].startsWith(answer)) { 
				numberOfItems++
				
				if (numberOfItems === 1) { escapeValve = array[j] };
				array[j][i] === '1' ? ones++ : zeroes++; 
			}
			
			if (j === array.length - 1) {
				if (numberOfItems === 1) { co2ScrubberRating = escapeValve; break; }
				zeroes <= ones ? answer += '0' : answer += '1';
			}
		}
		
		if (i === array[0].length - 1) {
			if (co2ScrubberRating !== escapeValve) { co2ScrubberRating = answer; }
			// console.log(" ");
			// console.log("Finished computing CO2 Scrubber Rating!");
			// console.log(" ");
		}
	}
} 

// // Part 2 Test
// computeOxygenGeneratorRating(testArray);
// computeCO2GeneratorRating(testArray);
computeOxygenGeneratorRating(lines);
computeCO2GeneratorRating(lines);
oxygenGeneratorRating = binaryToDecimal(oxygenGeneratorRating);
co2ScrubberRating = binaryToDecimal(co2ScrubberRating);
lifeSupportRating = oxygenGeneratorRating * co2ScrubberRating;

console.log(",___________________________________________________________________________________________,")
console.log("|-- Gamma Rate: ", gammaRate, "          Epsilon Rate: ", epsilonRate, "          Power Consumption: ", powerConsumption, "--|")
console.log("|-- O2 Rating: ", oxygenGeneratorRating, "      Life Support Rating: ", lifeSupportRating, "      CO2 Scrubber Rating: ", co2ScrubberRating, "--|")
console.log("`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`")