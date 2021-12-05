const { aoc_input } = require('../config');
const fs = require('fs');
const [numbersCalled, ...boardsInput] = fs
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
    .map((item, i) => ({ board: i,  number: item, called: false})  
  ));

let bingoCaller = numbersCalled.split(',').map(num => parseInt(num))

let lastNumberCalled;

let winningCardTracker = [];

let onlyOneWinner = winningCardTracker.filter((item) => item.won === false).length === 1;

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

function cardTrackerBuilder() {
  for (let i = 0; i < boards.length; i++) {
    winningCardTracker.push({ board: i, won: false })
  }
}


function checkForNumberToMark(boardsArray, valueArray) {
  // while (!onlyOneWinner) {
    for (let j = 0; j < valueArray.length; j++) {
      for (let k = 0; k < boardsArray.length; k++) {
        lastNumberCalled = valueArray[j];
        
        for (let i = 0; i < boardsArray[k].length; i++) {
          if (boardsArray[k][i].number === valueArray[j]) {
            // console.log(`Board #${k} has the number ${lastNumberCalled}!`)
            boardsArray[k][i].called = true;
            checkSingleBoardForWinner(boardsArray[k], k);
            // console.log(onlyOneWinner, 'only one winner');
            console.log(winningCardTracker[k])
          }
        }
      }
    }
  }
// }

function checkSingleBoardForWinner(board, index) { 
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    let winner = [];
    
    for (let j = 0; j < WINNING_COMBINATIONS[i].length; j++) {
      
      if (!board[WINNING_COMBINATIONS[i][j]].called) {
        winner.push(false);
      } else {
        winner.push(true);
      }
      
      if (j === WINNING_COMBINATIONS[i].length - 1 && winner.every(v => v === true)) { 
        // console.log("************THERE'S A WINNER************"); 
        winningCardTracker[index].won = true;
        // onlyOneWinner = true;
        return scoreOfWinningBoard(board); 
      }
    }
  }
  return false;
}

function scoreOfWinningBoard(board) {
  let sum = 0;
  
  for (let i = 0; i < board.length; i++) {
    if (!board[i].called) { sum += board[i].number * lastNumberCalled }
  }
  // console.log("Final Winning Number:", lastNumberCalled);
  console.log("Final Score of Winning Board:", sum);
  console.log(winningCardTracker.filter((item) => item.won === false).length === 0)
}


function playBingo() {
  cardTrackerBuilder();
  checkForNumberToMark(boards, bingoCaller);
}

playBingo()

// // This is test code to manually override a board's values for testing purposes
// console.log(boards[0])
// boards[0][0].called = true;
// boards[0][1].called = true;
// boards[0][2].called = true;
// boards[0][3].called = true;
// boards[0][4].called = true;
// boards[0][5].called = true;
// boards[0][10].called = true;
// boards[0][15].called = true;
// boards[0][20].called = true;
// console.log(boards[0])