const { aoc_input } = require('../config');
const fs = require('fs');
const { clear } = require('console');
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
        // console.log('test', currentHeight, leftHeight);
        points.push(testPoint(index, j));
      }
    }
    // console.log(points);
  }
  // console.log(points.length);
};

const testLeft = (fullMapIndex, j, list) => {
  // console.log('test left', heightMap[fullMapIndex], j);
  const left = heightMap[fullMapIndex][j - 1]
    ? heightMap[fullMapIndex][j - 1]
    : '9';
  if (left === '9') {
    return list;
  } else if (left > heightMap[fullMapIndex][j]) {
    return testPoint(fullMapIndex, j - 1, [...list, [fullMapIndex, j - 1]]);
  } else {
    return list;
  }
};

const testRight = (fullMapIndex, j, list) => {
  // console.log('test right');
  const right = heightMap[fullMapIndex][j + 1]
    ? heightMap[fullMapIndex][j + 1]
    : '9';
  if (right === '9') {
    return list;
  } else if (right > heightMap[fullMapIndex][j]) {
    return testPoint(fullMapIndex, j + 1, [...list, [fullMapIndex, j + 1]]);
  } else {
    return list;
  }
};

const testTop = (fullMapIndex, j, list) => {
  // console.log('test top', fullMapIndex, j, list);
  const top = heightMap[fullMapIndex - 1]
    ? heightMap[fullMapIndex - 1][j]
    : '9';
  if (top === '9') {
    return list;
  } else if (top > heightMap[fullMapIndex][j]) {
    return testPoint(fullMapIndex - 1, j, [...list, [fullMapIndex - 1, j]]);
  } else {
    return list;
  }
};

const testBottom = (fullMapIndex, j, list) => {
  // console.log('test bottom');
  const bottom = heightMap[fullMapIndex + 1]
    ? heightMap[fullMapIndex + 1][j]
    : '9';
  if (bottom === '9') {
    return list;
  } else if (bottom > heightMap[fullMapIndex][j]) {
    return testPoint(fullMapIndex + 1, j, [...list, [fullMapIndex + 1, j]]);
  } else {
    return list;
  }
};

function testPoint(i, j, list = []) {
  // console.log(i, j);

  if (!list.length) {
    list.push([i, j]);
  }
  list = testTop(i, j, list);
  list = testLeft(i, j, list);
  list = testRight(i, j, list);
  list = testBottom(i, j, list);

  // console.log(list);
  return list;
}

lowPoints();

// console.log(points);

// function clearDupes(arr) {
//   for (var i = 0; i < arr.length; i++) {
//     console.log('test', arr[i]);
//     for (let j = 0; j < arr[i].length; j++) {
//       const element = arr[i][j];

//       console.log(element, arr[i].length);
//       // console.log(filteredArray(element));
//       // filteredArray(element);
//     }
//   }
// }

// let filteredArray = (arr1, arr2) =>
//   arr2.every((arr2Item) => arr1.includes(arr2Item));

// console.log(clearDupes(points));

const locations = points.map((point) => point.map(([x, y]) => ({ x, y })));

function clearDupes() {
  let arr = [];

  for (let i = 0; i < locations.length; i++) {
    arr.push([
      ...new Map(locations[i].map((v) => [JSON.stringify(v), v])).values(),
    ]);
  }
  return arr;
}

let cleanArray = clearDupes();

function countBasin() {
  let arr = [];

  for (let index = 0; index < cleanArray.length; index++) {
    const element = cleanArray[index];

    arr.push(element.length);
  }

  console.log(arr);
  return arr;
}

let basinArray = countBasin();

let sortedBasinArray = basinArray
  .map((item) => parseInt(item))
  .sort((a, b) => b - a);

console.log(sortedBasinArray[0] * sortedBasinArray[1] * sortedBasinArray[2]);
