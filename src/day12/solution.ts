const DIRECTIONS = [
  [-1, 0], // UP
  [1, 0], // DOWN
  [0, -1], // LEFT
  [0, 1], // RIGHT
]

interface Region {
  char: string;
  positions: Set<string>;
}

const convertToArray = (input: string) => {
  return input.trim().split('\n').reduce<string[][]>((acc, line) => {
    acc.push(line.split(''));
    return acc;
  }, []);
}

const canVisitPosition = (array: string[][], location: number[]): boolean => {
  const [row, index] = location;
  const canVisitNextRow = typeof array[row] === 'object';
  const canVisitNextIndex = canVisitNextRow && typeof array[row][index] === 'string';

  return canVisitNextRow && canVisitNextIndex;
}

const getRegionKey = (row: number, col: number): string => `${row},${col}`;

const findRegions = (map: string[][]): Region[] => {
  const visited = new Set<string>();
  const regions: Region[] = [];

  const dfs = (row: number, col: number, char: string, positions: Set<string>) => {
    const key = getRegionKey(row, col);
    if (visited.has(key)) return;
    if (!canVisitPosition(map, [row, col])) return;
    if (map[row][col] !== char) return;

    visited.add(key);
    positions.add(key);

    for (const [rowChange, indexChange] of DIRECTIONS) {
      dfs(row + rowChange, col + indexChange, char, positions);
    }
  };

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const key = getRegionKey(row, col);
      if (!visited.has(key)) {
        const positions = new Set<string>();
        dfs(row, col, map[row][col], positions);
        regions.push({ char: map[row][col], positions });
      }
    }
  }

  return regions;
};

const calculatePerimeter = (positions: Set<string>, map: string[][]): number => {
  let perimeter = 0;

  for (const pos of positions) {
    const [row, col] = pos.split(',').map(Number);

    for (const [rowChange, indexChange] of DIRECTIONS) {
      const newRow = row + rowChange;
      const newCol = col + indexChange;
      const key = getRegionKey(newRow, newCol);

      if (!positions.has(key) || !canVisitPosition(map, [newRow, newCol])) {
        perimeter++;
      }
    }
  }

  return perimeter;
};

export const part1 = (input: string): number => {
  const map = convertToArray(input);
  const regions = findRegions(map);

  return regions.reduce((total, region) => {
    const area = region.positions.size;
    const perimeter = calculatePerimeter(region.positions, map);
    return total + (area * perimeter);
  }, 0);
};

export const part2 = (input: string): number => {
  return 0;
};