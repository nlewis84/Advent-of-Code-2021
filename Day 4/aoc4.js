const { aoc_input } = require('../config');
const fs = require('fs');
const [bingoCaller, ...boardsInput] = fs
	.readFileSync(`${aoc_input}`, 'utf-8')
	.split('\n\n')
  // .filter(e =>  e)

let boards = boardsInput.map(board => board
  .split('\n')
  .map(row => row
    .trim()
    .split(/\s+/)
    .map(cell => parseInt(cell)))
  .flat()
  .map((item, i) => ({index: i, number: item, called: false})  
  ));

const WINNING_COMBINATIONS = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24]
]

function checkSingleBoardForWinner(board) { 
  let winner = false;
  console.log(board);
  
  exit_loops:
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {

    exit_combo:
    for (let j = 0; j < WINNING_COMBINATIONS[i].length; j++) {
      // console.log("2nd for: ", winner);
      console.log(board[WINNING_COMBINATIONS[i][j]])
      if (!board[WINNING_COMBINATIONS[i][j]].called) {
        // console.log('if: ', winner);
        winner = false;
        break exit_combo;
      }
console.log("it's true!!!")
      winner = true;
      return winner;
      break exit_loops;
    }

  }

}

checkSingleBoardForWinner(boards[0]);
