const WALL = '#';
const START_TILE = 'S';
const END_TILE = 'E';

const FORWARD_SCORE = 1;
const TURN_SCORE = 1000;

const DIRECTIONS = [
  {y: -1, x: 0}, // UP
  {y: 0, x: 1}, // RIGHT
  {y: 1, x: 0}, // DOWN
  {y: 0, x: -1}, // LEFT
] as const;

const DIRECTIONS_CHAR = [
  '^', // UP
  '>', // RIGHT
  'v', // DOWN
  '<', // LEFT
] as const;

type Position = {
  x: number;
  y: number
}

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

const convertToMap = (input: string) => {
  const map = input.trim().split('\n').reduce<string[][]>((acc, line) => {
    acc.push(line.split(''));
    return acc;
  }, []);

  let startPosition: Position = {x: 0, y:0 };
  for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    const row = map[rowIndex];
    for (let index = 0; index < row.length; index++) {
      const element = row[index];
      if (element === START_TILE) {
        startPosition = {x: index, y: rowIndex};
        break;
      }
    }

  }

  return {
    map,
    startPosition
  };
}

const canVisitPosition = (map: string[][], location: Position): boolean => {
  const {y: row, x: index} = location;
  const canVisitNextRow = typeof map[row] === 'object';
  const canVisitNextIndex = canVisitNextRow && typeof map[row][index] === 'string';

  return canVisitNextRow && canVisitNextIndex;
}

export const part1 = (input: string): number => {
  const { map, startPosition } = convertToMap(input);
  const visitedMap = new Set<string>();
  // Use priority queue: [position, directionIndex]
  const queue = new PriorityQueue<[Position, number]>();
  queue.enqueue([startPosition, 1], 0); // Start facing RIGHT (1)
  const distances = new Map<string, number>();

  // Initialize start position
  const startKey = `${startPosition.y},${startPosition.x},1`;
  distances.set(startKey, 0);

  while (queue.length > 0) {
    const [position, currentDirectionIndex] = queue.dequeue()!;
    const currentKey = `${position.y},${position.x},${currentDirectionIndex}`;
    const currentDistance = distances.get(currentKey)!;

    if (map[position.y][position.x] === END_TILE) {
      return currentDistance;
    }

    if (visitedMap.has(currentKey)) {
      continue;
    }
    visitedMap.add(currentKey);

    const nextDirectionIndexes = [
      currentDirectionIndex,
      (currentDirectionIndex + 1) % DIRECTIONS.length,
      (currentDirectionIndex - 1 + DIRECTIONS.length) % DIRECTIONS.length
    ];

    for (const nextDirectionIndex of nextDirectionIndexes) {
      const nextDirection = DIRECTIONS[nextDirectionIndex];
      const nextPosition: Position = {
        x: position.x + nextDirection.x,
        y: position.y + nextDirection.y
      };

      if (!canVisitPosition(map, nextPosition) || map[nextPosition.y][nextPosition.x] === WALL) {
        continue;
      }

      // Calculate new distance
      const turnCost = nextDirectionIndex !== currentDirectionIndex ? TURN_SCORE : 0;
      const newDistance = currentDistance + FORWARD_SCORE + turnCost;
      const nextKey = `${nextPosition.y},${nextPosition.x},${nextDirectionIndex}`;

      // Only update if we found a shorter path
      if (!distances.has(nextKey) || newDistance < distances.get(nextKey)!) {
        distances.set(nextKey, newDistance);
        queue.enqueue([nextPosition, nextDirectionIndex], newDistance);
      }
    }
  }

  throw new Error("No path found to end");
};

export const part2 = (input: string): number => {
  return 0;
};