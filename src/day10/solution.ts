const DIRECTIONS = [
  [-1, 0], // UP
  [1, 0], // DOWN
  [0, -1], // LEFT
  [0, 1], // RIGHT
]

const canVisitLocation = (array: number[][], location: number[]): boolean => {
  const [row, index] = location;
  const canVisitNextRow = typeof array[row] === 'object';
  const canVisitNextIndex = canVisitNextRow && typeof array[row][index] === 'number';

  return canVisitNextRow && canVisitNextIndex;
}

const convertToArray = (input: string) => {
  return input.trim().split('\n').reduce<number[][]>((acc, line) => {
    acc.push(line.split('').map(Number));
    return acc;
  }, []);
}

interface QUEUE {
  coords: number[];
  startLocation: number[];
  height: number;
  visitedCoords: Set<string>;
}

const initializeQueue = (map: number[][]) => {
  const queue: QUEUE[] = [];
  const trailHeadScores = new Map();

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 0) {
        queue.push({
          coords: [i, j],
          startLocation: [i, j],
          height: 0,
          visitedCoords: new Set([`${i},${j}`])
        });
      }
    }
  }

  return queue;
}

const processQueue = (
  map: number[][],
  queue: QUEUE[],
  handleTrailHead: (key: string, route: QUEUE) => void,
  trackAllPaths: boolean = false,
) => {
  while (queue.length > 0) {
    const route = queue.shift()!;
    const [currentRow, currentIndex] = route.coords;
    const [startRow, startIndex] = route.startLocation;
    const key = `${startRow},${startIndex}`;

    if (map[currentRow][currentIndex] === 9) {
      handleTrailHead(key, route);
      continue;
    }

    for (const direction of DIRECTIONS) {
      const nextStep = [route.coords[0] + direction[0], route.coords[1] + direction[1]];
      if (!canVisitLocation(map, nextStep) || route.visitedCoords.has(`${nextStep[0]},${nextStep[1]}`)) {
        continue;
      }

      const diff = map[nextStep[0]][nextStep[1]] - route.height;
      if (diff === 1) {
        const newVisited = new Set(route.visitedCoords);
        newVisited.add(`${nextStep[0]},${nextStep[1]}`);
        queue.push({
          ...route,
          coords: [nextStep[0], nextStep[1]],
          height: route.height + 1,
          visitedCoords: trackAllPaths ? newVisited : route.visitedCoords.add(`${nextStep[0]},${nextStep[1]}`)
        });
      }
    }
  }
}

export const part1 = (input: string): number => {
  const map = convertToArray(input);
  const trailHeadScores: Map<string, number> = new Map();
  const queue = initializeQueue(map)

  for (let index = 0; index < queue.length; index++) {
    const item = queue[index];
    trailHeadScores.set(`${item.coords[0]},${item.coords[1]}`, 0);
  }

  processQueue(map, queue, (key) => {
    const currentScore = trailHeadScores.get(key)!;
    trailHeadScores.set(key, currentScore + 1);
  });

  let sum = 0;
  trailHeadScores.forEach((score) => sum += score);
  return sum;
};

export const part2 = (input: string): number => {
  const map = convertToArray(input);
  const trailHeadScores: Map<string, Set<string>> = new Map();
  const queue = initializeQueue(map)

  for (let index = 0; index < queue.length; index++) {
    const item = queue[index];
    trailHeadScores.set(`${item.coords[0]},${item.coords[1]}`, new Set());
  }

  processQueue(map, queue, (key, route) => {
    const pathString = Array.from(route.visitedCoords).join('|');
    trailHeadScores.get(key)?.add(pathString);
  }, true);

  let sum = 0;
  trailHeadScores.forEach((paths) => sum += paths.size);
  return sum;
};