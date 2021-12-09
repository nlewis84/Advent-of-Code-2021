const { aoc_input } = require('../config');
const fs = require('fs');
const heightMap = fs.readFileSync(`${aoc_input}`, 'utf-8').split('\n');

function indexOfSmallest(arr) {
  let lowest = 0;

  if (!arr.every((val) => val === arr[0])) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[lowest]) lowest = i;
    }

    return lowest;
  } else {
    return 3;
  }
}

let points = [];

const lowPoints = () => {
  for (let index = 0; index < heightMap.length; index++) {
    let prevRow = heightMap[index - 1];
    let row = heightMap[index];
    let nextRow = heightMap[index + 1];

    console.log(index, row);
    for (let j = 0; j < row.length; j++) {
      const leftHeight = row[j - 1] || '9';
      const currentHeight = row[j];
      const rightHeight = row[j + 1] || '9';
      const upperHeight = prevRow ? prevRow[j] : '9';
      const lowerHeight = nextRow ? nextRow[j] : '9';
      const heights = [
        currentHeight,
        lowerHeight,
        upperHeight,
        leftHeight,
        rightHeight,
      ];

      if (indexOfSmallest(heights) === 0) {
        points.push(parseInt(currentHeight) + 1);
        // // left
        if (row[j - 1] && heights[3] !== '9') {
          points.push(parseInt(heights[3]));
          individualHeightChecker(index, j - 1, j);
        } else {
          null;
        }
        // // right
        if (row[j + 1] && heights[4] !== '9') {
          points.push(parseInt(heights[4]));
          individualHeightChecker(index, j + 1, j);
        } else {
          null;
        }
        // row[j + 1] ? individualHeightChecker(index, j + 1) : null;
        // // upper
        if (prevRow && heights[2] !== '9') {
          points.push(parseInt(heights[2]));
          individualHeightChecker(index - j, j, j);
        } else {
          null;
        }
        // prevRow ? individualHeightChecker(index - 1, j) : null;
        // // lower
        // nextRow ? individualHeightChecker(index + 1, j) : null;
      }
    }
    console.log(points);
  }
  console.log(points.reduce((a, b) => a + b, 0));
};

const individualHeightChecker = (fullMapIndex, index, j) => {
  // prevRow = heightMap[fullMapIndex - 1];
  // row = heightMap[fullMapIndex];
  // nextRow = heightMap[fullMapIndex + 1];
  // const leftHeight = row[index - 1] || '9';
  // const currentHeight = row[index];
  // const rightHeight = row[index + 1] || '9';
  // const upperHeight = prevRow ? prevRow[index] : '9';
  // const lowerHeight = nextRow ? nextRow[index] : '9';
  // const heights = [
  //   currentHeight,
  //   lowerHeight,
  //   upperHeight,
  //   leftHeight,
  //   rightHeight,
  // ];
  // console.log(prevRow, row, nextRow, heights);
  console.log('ind Height Checker', fullMapIndex, index, j);
};

lowPoints();
