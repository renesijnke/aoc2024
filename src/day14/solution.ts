const SECONDS = 100;

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

  return `${endPositionY},${endPositionX}`;
}

const getQuadrantId = (position: string, space: Space) => {
  const [row, index] = position.split(',').map(Number);

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

export const part1 = (input: string, space: Space = { rows: 103, cols: 101 }): number => {
  const robots = convertToRobots(input);
  const map = [];
  for (let index = 0; index < 4; index++) {
    map.push(new Map<string, number>())
  }

  for (const robot of robots) {
    const endPosition = calculateRobotEndPosition(robot, space, SECONDS);
    const quadrantId = getQuadrantId(endPosition, space);
    if (quadrantId !== undefined) {
      map[quadrantId].set(endPosition, (map[quadrantId].get(endPosition) || 0) + 1);
    }
  }

  return map.map((map) => Array.from(map.values())).map((numbers) => numbers.reduce((a, b) => a + b, 0)).reduce((total, number) => total * number, 1);
};

export const part2 = (input: string): number => {
  return 0;
};