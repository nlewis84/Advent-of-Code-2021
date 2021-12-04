const { aoc_input } = require('../config');
const fs = require('fs');
const [bingoCaller, ...boardsInput] = fs
	.readFileSync(`${aoc_input}`, 'utf-8')
	.split('\n\n')
  // .filter(e =>  e)

console.log(bingoCaller)
console.log(boardsInput)

let boards = boardsInput.map(board => board.split('\n').map(row => row.trim().split(/\s+/).map(cell => parseInt(cell))));

console.log(boards[0].flat().map(item => ({number: item, called: false})))