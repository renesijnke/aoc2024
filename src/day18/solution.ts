const DIRECTIONS = [
  {y: -1, x: 0}, // UP
  {y: 0, x: 1}, // RIGHT
  {y: 1, x: 0}, // DOWN
  {y: 0, x: -1}, // LEFT
] as const;

type Position = {
  x: number;
  y: number
}

const WALL = '#';
const EMPTY_SPACE = '.';

class PriorityQueue<T> {
  private items: [number, T][] = [];

  enqueue(item: T, priority: number) {
    this.items.push([priority, item]);
    this.items.sort((a, b) => a[0] - b[0]);
  }

  dequeue(): T | undefined {
    const item = this.items.shift();
    return item ? item[1] : undefined;
  }

  get length(): number {
    return this.items.length;
  }
}

const generateMap = (input: string, range: number, bytes: number) => {
  const positionsMap = new Set<string>([...input.trim().split('\n').slice(0, bytes)]);
  const map: string[][] = Array(range+1).fill(null).map(() => Array(range+1).fill('.'));
  for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    const row = map[rowIndex];
    for (let index = 0; index < row.length; index++) {
      if (positionsMap.has(`${index},${rowIndex}`)) {
        map[rowIndex][index] = WALL;
      } else {
        map[rowIndex][index] = EMPTY_SPACE;
      }
    }

  }

  return map;
}

const canVisitPosition = (map: string[][], location: Position): boolean => {
  const {y: row, x: index} = location;
  const canVisitNextRow = typeof map[row] === 'object';
  const canVisitNextIndex = canVisitNextRow && typeof map[row][index] === 'string';

  return canVisitNextRow && canVisitNextIndex;
}

const searchPath = (map: string[][], range: number) => {
  const startPosition = {x: 0, y: 0};
  const visitedMap = new Set<string>();
  // Use priority queue: [position, directionIndex]
  const queue = new PriorityQueue<Position>();
  queue.enqueue(startPosition, 0); // Start facing RIGHT (1)
  const distances = new Map<string, number>();

  // Initialize start position
  const startKey = `${startPosition.y},${startPosition.x}`;
  distances.set(startKey, 0);

  while (queue.length > 0) {
    const position = queue.dequeue()!;
    const currentKey = `${position.y},${position.x}`;
    const currentDistance = distances.get(currentKey)!;

    if (position.x === range && position.y === range) {
      return currentDistance;
    }

    if (visitedMap.has(currentKey)) {
      continue;
    }
    visitedMap.add(currentKey);
    map[position.y][position.x] = '0';

    for (const nextDirection of DIRECTIONS) {
      const nextPosition: Position = {
        x: position.x + nextDirection.x,
        y: position.y + nextDirection.y
      };

      if (!canVisitPosition(map, nextPosition) || map[nextPosition.y][nextPosition.x] === WALL) {
        continue;
      }

      // Calculate new distance
      const newDistance = currentDistance + 1;
      const nextKey = `${nextPosition.y},${nextPosition.x}`;

      // Only update if we found a shorter path
      if (!distances.has(nextKey) || newDistance < distances.get(nextKey)!) {
        distances.set(nextKey, newDistance);
        queue.enqueue(nextPosition, newDistance);
      }
    }
  }

  return -1;
}

export const part1 = (input: string, range = 70, bytes = 1024): number => {
  const map = generateMap(input, range, bytes);
  return searchPath(map, range);
};

export const part2 = (input: string, range = 70): string => {
  const positionsMap: string[] = [...input.trim().split('\n')];

  let index = 1;
  let lastCoordinates = ''
  while (index <= positionsMap.length) {
    const map = generateMap(input, range, index);
    const distance = searchPath(map, range);

    if (distance === -1) {
      lastCoordinates = positionsMap[index-1];
      break;
    }

    index ++;
  }

  return lastCoordinates;
};