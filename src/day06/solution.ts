interface VisitedArea {
  x: number;
  y: number;
  xDirection: number;
  yDirection: number;
}

// ROUTES row, index basis
const ROUTES = [
  [-1, 0], // UP
  [0, 1], // RIGHT
  [1, 0], // DOWN
  [0, -1] // LEFT
];

const GUARD = '^';
const OBSTRUCTION = '#';

const convertToArray = (input: string) => {
  return input.trim().split('\n').reduce<string[][]>((acc, line) => {
    acc.push(line.split(''));
    return acc;
  }, []);
}

export const part1 = (input: string): number => {
  const array = convertToArray(input);
  let directionId = 0;
  let startPosition = [0, 0];

  for (let lineIndex = 0; lineIndex < array.length; lineIndex++) {
    const line = array[lineIndex];
    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      const element = line[charIndex];
      if (element === GUARD) {
        startPosition = [lineIndex, charIndex]
      }
    }
  }

  const [startRow, startIndex] = startPosition;
  const queue = [[startRow, startIndex, ROUTES[directionId][0], ROUTES[directionId][1]]];
  const visitedMap = new Set();

  while (queue.length > 0) {
    const [row, index, rowDirection, indexDirection] = queue.pop()!;

    const canVisitNextRow = typeof array[row + rowDirection] === 'object';
    const canVisitNextIndex = canVisitNextRow && typeof array[row + rowDirection][index + indexDirection] === 'string';
    const canVisitNextLocation = canVisitNextRow && canVisitNextIndex;

    visitedMap.add(`${row},${index}`);

    if (!canVisitNextLocation) {
      break;
    }

    const nextLocation = array[row + rowDirection][index + indexDirection];
    if (canVisitNextLocation && nextLocation === OBSTRUCTION) {
      directionId = directionId === ROUTES.length - 1 ? 0 : directionId + 1;
    }

    const direction = ROUTES[directionId];
    queue.push([row + direction[0], index + direction[1], direction[0], direction[1]])
  }

  return visitedMap.size;
};

export const part2 = (input: string): number => {
  const array = convertToArray(input);
  let directionId = 0;
  let startPosition = [0, 0];

  for (let lineIndex = 0; lineIndex < array.length; lineIndex++) {
    const line = array[lineIndex];
    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      const element = line[charIndex];
      if (element === GUARD) {
        startPosition = [lineIndex, charIndex]
      }
    }
  }

  const [startRow, startIndex] = startPosition;
  const queue = [[startRow, startIndex, ROUTES[directionId][0], ROUTES[directionId][1]]];
  const visitedMap = new Set<string>();

  while (queue.length > 0) {
    const [row, index, rowDirection, indexDirection] = queue.pop()!;

    const canVisitNextRow = typeof array[row + rowDirection] === 'object';
    const canVisitNextIndex = canVisitNextRow && typeof array[row + rowDirection][index + indexDirection] === 'string';
    const canVisitNextLocation = canVisitNextRow && canVisitNextIndex;

    visitedMap.add(`${row},${index}`);

    if (!canVisitNextLocation) {
      break;
    }

    const nextLocation = array[row + rowDirection][index + indexDirection];
    if (canVisitNextLocation && nextLocation === OBSTRUCTION) {
      directionId = directionId === ROUTES.length - 1 ? 0 : directionId + 1;
    }

    const direction = ROUTES[directionId];
    queue.push([row + direction[0], index + direction[1], direction[0], direction[1]])
  }


  let possiblePositions = 0;
  visitedMap.forEach((value) => {
    const [row, index] = value.split(',').map(Number);

    if (array[row][index] === '.') {
      const testArray = array.map(row => [...row]);
      testArray[row][index] = OBSTRUCTION;

      // Only count positions that break the loop
      if (createsLoop(testArray, startPosition)) {
        // console.log(output)
        possiblePositions++;
      }
    }
  })

  return possiblePositions;
};

const createsLoop = (array: string[][], startPosition: number[]): boolean => {
  let directionId = 0;
  const [startRow, startIndex] = startPosition;
  const queue = [[startRow, startIndex, ROUTES[directionId][0], ROUTES[directionId][1]]];
  const visitedMap = new Set<string>();

  let areALoop = false;

  while (queue.length > 0) {
    const [row, index, rowDirection, indexDirection] = queue.pop()!;

    const canVisitNextRow = typeof array[row + rowDirection] === 'object';
    const canVisitNextIndex = canVisitNextRow && typeof array[row + rowDirection][index + indexDirection] === 'string';
    const canVisitNextLocation = canVisitNextRow && canVisitNextIndex;

    if (!canVisitNextLocation) {
      areALoop = false;
      break;
    }

    if (visitedMap.has(`${row},${index},${rowDirection},${indexDirection}`)) {
      areALoop = true;
      break;
    }


    const nextLocation = array[row + rowDirection][index + indexDirection];
    if (canVisitNextLocation && nextLocation === OBSTRUCTION) {
      directionId = directionId === ROUTES.length - 1 ? 0 : directionId + 1;
    }

    const direction = ROUTES[directionId];
    queue.push([row + direction[0], index + direction[1], direction[0], direction[1]])
    visitedMap.add(`${row},${index},${rowDirection},${indexDirection}`);
  }

  return areALoop;

};
