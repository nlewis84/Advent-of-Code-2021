const { aoc_input } = require('../config');
const fs = require('fs');
const input = fs
  .readFileSync(`${aoc_input}`, 'utf-8')
  .split(' | ')
  .map((pattern) => {
    return pattern.split('\n');
  })
  .flat()
  .map((pattern) => {
    return pattern.split(' ');
  });

const signalPatterns = input.filter((pattern, i) => {
  return i % 2 === 0;
});

const digitalOutput = input.filter((pattern, i) => {
  return i % 2 === 1;
});

const signalPatternsOrdered = signalPatterns.sort(
  (a, b) => a.length - b.length
);

function sortString(str) {
  var arr = str.split('');
  var sorted = arr.sort();
  return sorted.join('');
}

function removeDuplicate(str) {
  return str
    .split('')
    .filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    })
    .join('');
}

let truthChecker = (arr) => arr.every((v) => v === true);

let sortedDigitalOutput = digitalOutput
  .flat()
  .filter(
    (item) =>
      item.length === 2 ||
      item.length === 3 ||
      item.length === 4 ||
      item.length === 7
  );

let answer = [];

function part2() {
  for (let i = 0; i < digitalOutput.length; i++) {
    answer.push(
      digitalOutput[i].map((item) => {
        let one = signalPatternsOrdered[i].filter(
          (item) => item.length === 2
        )[0];
        let four = signalPatternsOrdered[i].filter(
          (item) => item.length === 4
        )[0];
        let seven = signalPatternsOrdered[i].filter(
          (item) => item.length === 3
        )[0];
        let eight = signalPatternsOrdered[i].filter(
          (item) => item.length === 7
        )[0];
        let nine = removeDuplicate(four + seven);
        let isItNine;
        let isItSix;
        let isItTwo;
        let isItFive;

        switch (item.length) {
          case 2:
            return '1';
          case 4:
            return '4';
          case 3:
            return '7';
          case 7:
            return '8';
          case 5:
            // 2 should be missing two characters from 9
            isItTwo = nine.split('').map((char) => item.includes(char));
            if (isItTwo.filter((item) => item === false).length === 2) {
              return '2';
            }

            // 5 should be missing 1 character compared to the 7 string
            isItFive = seven.split('').map((char) => item.includes(char));
            if (isItFive.filter((item) => item === false).length === 1) {
              return '5';
            }

            return '3';
          case 6:
            isItSix = seven.split('').map((char) => item.includes(char));
            // check to see if the item is missing only 1 character compared to the 7 string
            if (isItSix.filter((item) => item === false).length === 1) {
              return '6';
            }

            isItNine = nine.split('').map((char) => item.includes(char));
            if (truthChecker(isItNine)) {
              return '9';
            }

            return '0';
          default:
            return console.log('there is a problem');
        }
      })
    );
  }

  // Sum the answer
  console.log(
    answer
      .map((item) =>
        item.join().replace(',', '').replace(',', '').replace(',', '')
      )
      // .flat()
      .map((item) => parseInt(item))
      .reduce((a, b) => a + b, 0)
  );
}

part2();
