const { aoc_input } = require('../config');
const fs = require('fs');
const heightMap = fs.readFileSync(`${aoc_input}`, 'utf-8').split('\n');

// const length = heightMap[0].length;
// const newRow = () => {
//   const newArr = [];

//   for (let i = 0; i < length; i++) {
//     newArr.push('9');
//   }

//   return newArr;
// };
// const newHeightMap = heightMap.unshift(newRow());

// console.log(length, newHeightMap);

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

const lowPoints = () => {
  let points = [];

  for (let index = 0; index < heightMap.length; index++) {
    const prevRow = heightMap[index - 1];
    const row = heightMap[index];
    const nextRow = heightMap[index + 1];

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

      indexOfSmallest(heights) === 0
        ? points.push(parseInt(currentHeight) + 1)
        : null;
    }
    console.log(points);
  }
  console.log(points.reduce((a, b) => a + b, 0));
};

lowPoints();
