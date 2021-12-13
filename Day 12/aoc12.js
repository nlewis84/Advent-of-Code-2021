const { aoc_input } = require('../config');
const fs = require('fs');
const caveMap = fs
  .readFileSync(`${aoc_input}`, 'utf-8')
  .split('\n')
  .map((item) => item.split('-'));

const connections = {};
for (let line of caveMap) {
  const [start, end] = line;

  if (!connections[start]) {
    connections[start] = new Set();
  }
  connections[start].add(end);

  if (!connections[end]) {
    connections[end] = new Set();
  }
  connections[end].add(start);
}

for (let connection in connections) {
  connections[connection] = Array.from(connections[connection]);
}

console.log(connections);

function pathways(cave, visited) {
  if (cave === 'end') {
    return ['end'];
  } else {
    let nextRooms = connections[cave].filter((connection) => {
      const isBigCave = connection === connection.toUpperCase();
      const isUnvisited = !visited.includes(connection);
      return isBigCave || isUnvisited;
    });

    let goodPaths = [];
    for (let nextRoom of nextRooms) {
      let nextRoomPaths = pathways(nextRoom, [...visited, cave]);
      goodPaths.push(...nextRoomPaths.map((path) => `${cave}-${path}`));
    }

    return goodPaths;
  }
}

const verifiedPathways = pathways('start', []);
console.log(verifiedPathways.length);
