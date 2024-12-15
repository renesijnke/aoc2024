const ROBOT = '@';
const BOX = 'O';
const WALL = '#';
const EMPTY_SPACE = '.';

type Location = { x: number, y: number };

type MoveDirection = {
  y: number;
  x: number;
}

type Moves = {
  [key in '<' | '>' | '^' | 'v']: MoveDirection;
}

const MOVES: Moves = {
  '<': { y: 0, x: -1 },
  '>': { y: 0, x: 1 },
  '^': { y: -1, x: 0 },
  'v': { y: 1, x: 0 },
}

const parseInput = (input: string) => {
  const [mapSection, movesSection] = input.trim().split('\n\n');

  const map = mapSection.trim().split('\n').reduce<string[][]>((acc, line) => {
    acc.push(line.split(''));
    return acc;
  }, []);

  let robotPosition = { x: 0, y: 0 };
  for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    const row = map[rowIndex];
    for (let index = 0; index < row.length; index++) {
      const element = row[index];
      if (element === ROBOT) {
        robotPosition = { x: index, y: rowIndex };
        break;
      }
    }
  }

  const moves = movesSection.split('').filter((move) => move !== '\n');

  return {
    map,
    moves,
    robot: robotPosition,
  }
}

const canVisitLocation = (array: string[][], location: Location): boolean => {
  const { y: row, x: index } = location;
  const canVisitNextRow = typeof array[row] === 'object';
  const canVisitNextIndex = canVisitNextRow && typeof array[row][index] === 'string';

  return canVisitNextRow && canVisitNextIndex && array[row][index] !== WALL;
}

const getBoxesToMove = (map: string[][], location: Location, direction: Location) => {
  const boxes: Location[] = [];
  function findNextLocation(location: Location, boxes: Location[]) {
    if (map[location.y][location.x] === WALL) {
      return [];
    }

    if (map[location.y][location.x] === EMPTY_SPACE) {
      return boxes;
    }

    if (map[location.y][location.x] === BOX) {
      boxes.push(location);
    }

    return findNextLocation({ y: location.y + direction.y, x: location.x + direction.x }, boxes)
  }

  return findNextLocation(location, boxes);
}

export const part1 = (input: string): number => {
  let { map, moves, robot } = parseInput(input);

  for (const move of moves) {
    const direction = MOVES[move as keyof Moves];
    const nextPositionCoords = { y: robot.y + direction.y, x: robot.x + direction.x };

    if (!canVisitLocation(map, nextPositionCoords)) {
      continue;
    }

    const nextPosition = map[nextPositionCoords.y][nextPositionCoords.x]

    if (nextPosition === WALL) {
      continue;
    }

    if (nextPosition === BOX) {
      // lets see if we can move the boxes
      const boxes = getBoxesToMove(map, nextPositionCoords, { y: direction.y, x: direction.x });
      if (boxes.length === 0) {
        continue;
      }

      for (const box of boxes) {
        map[box.y + direction.y][box.x + direction.x] = BOX;
      }
    }

    map[robot.y][robot.x] = EMPTY_SPACE;
    robot = {
      x: nextPositionCoords.x,
      y: nextPositionCoords.y,
    }
    map[robot.y][robot.x] = ROBOT;
  }

  // console.log(map.map((row) => row.join('')).join('\n'))
  let sum = 0;
  for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    const row = map[rowIndex];
    for (let index = 0; index < row.length; index++) {
      const element = row[index];
      if (element === BOX) {
        sum += 100 * rowIndex + index;
      }
    }
  }

  return sum;
};

export const part2 = (input: string): number => {
  return 0;
};