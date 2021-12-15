const { aoc_input } = require('../config');
const fs = require('fs');
const { dir } = require('console');
const [dotsInput, instructionsInput] = fs
  .readFileSync(`${aoc_input}`, 'utf-8')
  .split('\n\n');

let dots = dotsInput.split('\n');

const foldingInstructions = instructionsInput.split('\n').map((fold) => {
  let [direction, line] = fold.split('=');
  return [direction, parseInt(line)];
});

function foldAlongY(line) {
  let combinedDots = new Set();

  for (const dot of dots) {
    const [x, y] = dot.split(',').map((coord) => parseInt(coord));

    if (y <= line) {
      combinedDots.add(dot);
    } else {
      let distanceFromDotToLine = y - line;
      let foldedY = y - 2 * distanceFromDotToLine;
      let foldedDot = `${x},${foldedY}`;
      combinedDots.add(foldedDot);
    }
  }

  dots = Array.from(combinedDots);
}

function foldAlongX(line) {
  let combinedDots = new Set();

  for (const dot of dots) {
    const [x, y] = dot.split(',').map((coordinate) => parseInt(coordinate));

    if (x <= line) {
      combinedDots.add(dot);
    } else {
      let distanceFromDotToLine = x - line;
      let foldedX = x - 2 * distanceFromDotToLine;
      let foldedDot = `${foldedX},${y}`;
      combinedDots.add(foldedDot);
    }
  }

  dots = Array.from(combinedDots);
}

function fold(instruction) {
  const [direction, crease] = instruction;
  if (direction === 'fold along y') {
    foldAlongY(crease);
  } else {
    foldAlongX(crease);
  }
}

function printPaper() {
  let { maxX, maxY } = dots.reduce(
    ({ maxX, maxY }, dot) => {
      const [x, y] = dot.split(',').map((coordinate) => parseInt(coordinate));
      return { maxX: Math.max(maxX, x), maxY: Math.max(maxY, y) };
    },
    { maxX: 0, maxY: 0 }
  );

  let { minX, minY } = dots.reduce(
    ({ minX, minY }, dot) => {
      const [x, y] = dot.split(',').map((coordinate) => parseInt(coordinate));
      return { minX: Math.min(minX, x), minY: Math.min(minY, y) };
    },
    { minX: Number.MAX_VALUE, minY: Number.MAX_VALUE }
  );

  let grid = [];
  for (let i = minY; i <= maxY; i++) {
    grid.push(new Array(maxX - minX + 1).fill('.'));
  }

  for (const dot of dots) {
    const [x, y] = dot.split(',').map((coordinate) => parseInt(coordinate));
    grid[y - minY][x - minX] = '#';
  }

  grid.forEach((row) => console.log(row.join('')));
}

// Part 1
const [firstInstruction, ...restOfTheInstructions] = foldingInstructions;

printPaper();
fold(firstInstruction);
console.log(dots.length);

// Part 2
restOfTheInstructions.forEach(fold);
printPaper();
