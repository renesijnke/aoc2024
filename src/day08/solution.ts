const EMPTY_LOCATION = '.';
const ANTINODE = '#';

const convertToArray = (input: string) => {
  return input.trim().split('\n').reduce<string[][]>((acc, line) => {
    acc.push(line.split(''));
    return acc;
  }, []);
}
const convertToMap = (array: string[][]) => {
  const map = new Map<string, string[]>();

  for (let rowIndex = 0; rowIndex < array.length; rowIndex++) {
    const row = array[rowIndex];
    for (let index = 0; index < row.length; index++) {
      const element = row[index];
      if (element === EMPTY_LOCATION) continue;

      if (!map.has(element)) {
        map.set(element, []);
      }
      map.set(element, [...map.get(element)!, `${rowIndex},${index}`]);
    }
  }

  return map;
}

const canPlaceAntinodeAtLocation = (array: string[][], location: number[]): boolean => {
  const [row, index] = location;
  const canVisitNextRow = typeof array[row] === 'object';
  const canVisitNextIndex = canVisitNextRow && typeof array[row][index] === 'string';

  return canVisitNextRow && canVisitNextIndex;
}

export const part1 = (input: string): number => {
  const array = convertToArray(input);
  const map = convertToMap(array);
  const antinodes = new Set<string>();

  map.forEach((locations) => {
    const coords = locations.map(loc => loc.split(',').map(Number));
    for (let index = 0; index < coords.length; index++) {
      const coordinates = coords[index];

      for (let nextLocationIndex = index + 1; nextLocationIndex < locations.length; nextLocationIndex++) {
        const nextCoordinates = coords[nextLocationIndex];

        const diffRow = Math.abs(coordinates[0] - nextCoordinates[0]);
        const diffIndex = nextCoordinates[1] > coordinates[1]
          ? -Math.abs(coordinates[1] - nextCoordinates[1])
          : Math.abs(coordinates[1] - nextCoordinates[1]);

        const nextLocationMin = [coordinates[0] - diffRow, coordinates[1] + diffIndex];
        const nextLocationMax = [nextCoordinates[0] + diffRow, nextCoordinates[1] - diffIndex];

        if (canPlaceAntinodeAtLocation(array, nextLocationMin)) {
          antinodes.add(`${nextLocationMin[0]},${nextLocationMin[1]}`);
        };
        if (canPlaceAntinodeAtLocation(array, nextLocationMax)) {
          antinodes.add(`${nextLocationMax[0]},${nextLocationMax[1]}`);
        };
      }
    }
  })

  return antinodes.size;
};

export const part2 = (input: string): number => {
  const array = convertToArray(input);
  const map = convertToMap(array);
  const antinodes = new Set<string>();

  map.forEach((locations) => {
    const coords = locations.map(loc => loc.split(',').map(Number));
    for (let index = 0; index < locations.length; index++) {
      const coordinates = coords[index];
      antinodes.add(`${coordinates[0]},${coordinates[1]}`)

      for (let nextLocationIndex = index + 1; nextLocationIndex < locations.length; nextLocationIndex++) {
        const nextCoordinates = coords[nextLocationIndex];

        const diffRow = Math.abs(coordinates[0] - nextCoordinates[0]);
        const diffIndex = nextCoordinates[1] > coordinates[1]
          ? -Math.abs(coordinates[1] - nextCoordinates[1])
          : Math.abs(coordinates[1] - nextCoordinates[1]);

        let minIndex = 1
        while (canPlaceAntinodeAtLocation(array, [coordinates[0] - (diffRow * minIndex), coordinates[1] + (diffIndex * minIndex)])) {
          const nextLocationMin = [coordinates[0] - (diffRow * minIndex), coordinates[1] + (diffIndex * minIndex)];
          if (canPlaceAntinodeAtLocation(array, nextLocationMin)) {
            antinodes.add(`${nextLocationMin[0]},${nextLocationMin[1]}`);
          };
          minIndex++;
        }

        let maxIndex = 1
        while (canPlaceAntinodeAtLocation(array, [nextCoordinates[0] + (diffRow * maxIndex), nextCoordinates[1] - (diffIndex * maxIndex)])) {
          const nextLocationMax = [nextCoordinates[0] + (diffRow * maxIndex), nextCoordinates[1] - (diffIndex * maxIndex)];
          if (canPlaceAntinodeAtLocation(array, nextLocationMax)) {
            antinodes.add(`${nextLocationMax[0]},${nextLocationMax[1]}`);
          };
          maxIndex++;
        }
      }
    }
  })

  return antinodes.size;
};