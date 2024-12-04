type QueueItem = [
  row: number,
  index: number,
  currentString: string,
  rowOffset: number | undefined,
  indexOffset: number | undefined
];

const convertToArray = (input: string) => {
  return input.trim().split('\n').reduce<string[][]>((acc, line) => {
    acc.push(line.split(''));
    return acc;
  }, []);
}

export const part1 = (input: string): number => {
  const inputArray = convertToArray(input);

  const searchString = 'XMAS';
  let totalCount = 0;
  const queue: QueueItem[] = [];

  for (let row = 0; row < inputArray.length; row++) {
    const line = inputArray[row];

    for (let index = 0; index < line.length; index++) {
      const char = line[index];
      if (char === 'X') {
        queue.push([row, index, 'X', undefined, undefined])
      }
    }
  }

  while (queue.length > 0) {
    const [row, index, currentString, rowOffset, indexOffset] = queue.pop()!;

    if (currentString === searchString) {
      totalCount++;
      continue;
    }

    if (rowOffset === undefined && indexOffset === undefined) {
      for (let rowIndex = -1; rowIndex < 2; rowIndex++) {
        const searchRow = inputArray[row + rowIndex];
        for (let charIndex = -1; charIndex < 2; charIndex++) {
          const currentChar = (searchRow && searchRow[index + charIndex]) ?? '';
          if (currentChar === searchString[currentString.length]) {
            queue.push([row + rowIndex, index + charIndex, currentString + currentChar, rowIndex, charIndex]);
          }
        }
      }

      continue;
    }

    const searchRow = inputArray[row + (rowOffset as number)];
    const currentChar = (searchRow && searchRow[index + (indexOffset as number)]) ?? '';

    if (currentChar === searchString[currentString.length]) {
      queue.push([row + (rowOffset as number), index + (indexOffset as number), currentString + currentChar, rowOffset, indexOffset]);
    }
  }

  return totalCount;
};

export const part2 = (input: string): number => {
  const inputArray = convertToArray(input);
  let totalCount = 0;

  const patterns = [
    ['M', 'S'], // top-left to bottom-right
    ['S', 'M'], // top-left to bottom-right (reversed)
    ['M', 'S'], // top-right to bottom-left
    ['S', 'M']  // top-right to bottom-left (reversed)
  ];

  for (let row = 1; row < inputArray.length - 1; row++) {
    for (let index = 1; index < inputArray[row].length - 1; index++) {
      // Check if center position is 'A'
      if (inputArray[row][index] === 'A') {
        for (let p1 = 0; p1 < 2; p1++) {
          for (let p2 = 0; p2 < 2; p2++) {
            // Check diagonal 1 (top-left to bottom-right)
            const topLeft = inputArray[row - 1][index - 1] === patterns[p1][0];
            const bottomRight = inputArray[row + 1][index + 1] === patterns[p1][1];

            // Check diagonal 2 (top-right to bottom-left)
            const topRight = inputArray[row - 1][index + 1] === patterns[p2][0];
            const bottomLeft = inputArray[row + 1][index - 1] === patterns[p2][1];

            if (topLeft && bottomRight && topRight && bottomLeft) {
              totalCount++;
            }
          }
        }
      }
    }
  }

  return totalCount;
};
