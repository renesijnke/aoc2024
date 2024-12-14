const SECONDS = 100;
const ROBOT = '*';

const DIRECTIONS = [
  [-1, 0], // UP
  [1, 0], // DOWN
  [0, -1], // LEFT
  [0, 1], // RIGHT
]

interface Robot {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
}

interface Space {
  rows: number;
  cols: number
}

export const convertToRobots = (input: string): Robot[] => {
  return input
    .trim()
    .split('\n')
    .map(line => {
      const [positionPart, velocityPart] = line.split(' ');

      // Extract position coordinates
      const [px, py] = positionPart
        .substring(2) // Remove 'p='
        .split(',')
        .map(Number);

      // Extract velocity coordinates
      const [vx, vy] = velocityPart
        .substring(2) // Remove 'v='
        .split(',')
        .map(Number);

      return {
        position: { x: px, y: py },
        velocity: { x: vx, y: vy }
      };
    });
}

export const calculateRobotEndPosition = (robot: Robot, space: Space, seconds: number = SECONDS) => {
  const { position, velocity } = robot;

  // Calculate end positions
  let endPositionX = position.x + (velocity.x * seconds);
  let endPositionY = position.y + (velocity.y * seconds);

  // Implement teleport feature
  endPositionX = ((endPositionX % space.cols) + space.cols) % space.cols;
  endPositionY = ((endPositionY % space.rows) + space.rows) % space.rows;

  return {
    y: endPositionY,
    x: endPositionX,
  };
}

const getQuadrantId = (position: { x: number; y: number }, space: Space) => {
  const row = position.y;
  const index = position.x;

  const centerX = Math.floor(space.cols / 2);
  const centerY = Math.floor(space.rows / 2);

  // top left
  if (index < centerX && row < centerY) {
    return 0
  }
  // top right
  else if (index > centerX && row < centerY) {
    return 1
  }
  // bottom left
  else if (index < centerX && row > centerY) {
    return 2
  }
  // bottom right
  else if (index > centerX && row > centerY) {
    return 3
  }
}

const drawTree = (space: Space, set: { x: number, y: number }[]) => {
  let output = []
  for (let row = 0; row < space.rows; row++) {
    const row = []
    for (let col = 0; col < space.cols; col++) {
      row.push('.')
    }
    output.push(row)
  }

  for (const robot of set) {
    output[robot.y][robot.x] = ROBOT;
  }

  return output.map((row) => row.join('')).join('\n');
}

const searchForNeighbours = (positions: { x: number, y: number }[]): number => {
  const positionSet = new Set(positions.map(p => `${p.x},${p.y}`));
  let neighbourCount = 0;

  for (const pos of positions) {
    for (const [dx, dy] of DIRECTIONS) {
      const neighborKey = `${pos.x + dx},${pos.y + dy}`;
      if (positionSet.has(neighborKey)) {
        neighbourCount++;
      }
    }
  }

  return neighbourCount / 2;
}

export const part1 = (input: string, space: Space = { rows: 103, cols: 101 }): number => {
  const robots = convertToRobots(input);
  const map = [];
  for (let index = 0; index < 4; index++) {
    map.push(new Map<string, number>())
  }

  for (const robot of robots) {
    const endPosition = calculateRobotEndPosition(robot, space, SECONDS);
    const positionKey = `${endPosition.y},${endPosition.x}`;
    const quadrantId = getQuadrantId(endPosition, space);
    if (quadrantId !== undefined) {
      map[quadrantId].set(positionKey, (map[quadrantId].get(positionKey) || 0) + 1);
    }
  }

  return map.map((map) => Array.from(map.values())).map((numbers) => numbers.reduce((a, b) => a + b, 0)).reduce((total, number) => total * number, 1);
};

export const part2 = (input: string, space: Space = { rows: 103, cols: 101 }): number => {
  const robots = convertToRobots(input);
  let seconds = 1;

  while (true) {
    const set: { x: number, y: number }[] = [];
    for (const robot of robots) {
      set.push(calculateRobotEndPosition(robot, space, seconds));
    }

    const neighbourCount = searchForNeighbours(set);
    if (neighbourCount > (set.length / 2)) {
      const tree = drawTree(space, set);
      console.log(tree);
      return seconds;
    }

    seconds++;
  }
};