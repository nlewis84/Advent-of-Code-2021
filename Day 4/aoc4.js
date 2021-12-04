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
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    let winner = [];

    for (let j = 0; j < WINNING_COMBINATIONS[i].length; j++) {

      if (!board[WINNING_COMBINATIONS[i][j]].called) {
        winner.push(false);
      } else {
        winner.push(true);
      }

      if (j === WINNING_COMBINATIONS[i].length - 1 && winner.every(v => v === true)) { 
        console.log("THERES A WINNER"); 
        return winner; 
      } else { 
        console.log("......no winner.... :("); return false
      }
    }
    // console.log(winner);
  }
}

// console.log(checkSingleBoardForWinner(boards[0]))

checkSingleBoardForWinner(boards[0]);

// boards[0][0].called = true;
// boards[0][1].called = true;
// boards[0][2].called = true;
// boards[0][3].called = true;
// boards[0][4].called = true;
// boards[0][5].called = true;
// boards[0][6].called = true;
// boards[0][7].called = true;
// boards[0][8].called = true;
// boards[0][9].called = true;
// boards[0][10].called = true;
// boards[0][11].called = true;
// boards[0][12].called = true;
// boards[0][13].called = true;
// boards[0][15].called = true;
// boards[0][20].called = true;
// console.log(boards[0])

// checkSingleBoardForWinner(boards[0]);
// console.log(checkSingleBoardForWinner(boards[0]))

// function checkAllBoardsForWinner(boards) {
//   let winner = false;

// // console.log(boards);

//   for (let i = 0; i < boards.length; i++) {
//     winner = checkSingleBoardForWinner(boards[i]);
//     checkSingleBoardForWinner(boards[i]);
//   }
// }

// checkAllBoardsForWinner(boards);