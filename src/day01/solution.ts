type Columns = [number[], number[]];

const convertToColumns = (input: string): Columns => {
  return input.trim().split('\n').reduce<Columns>((acc, line) => {
    const [left, right] = line.trim().split(/\s+/).map(Number);
    acc[0].push(left);
    acc[1].push(right);
    return acc;
  }, [[], []]);
}

export const part1 = (input: string): number => {
  const [leftColumn, rightColumn] = convertToColumns(input);

  leftColumn.sort();
  rightColumn.sort();

  let totalDistance = 0;
  for (let index = 0; index < leftColumn.length; index++) {
    const leftValue = leftColumn[index];
    const rightValue = rightColumn[index];

    const diff = Math.abs(leftValue - rightValue);
    totalDistance += diff;
  }

  return totalDistance;
};

export const part2 = (input: string): number => {
  const [leftColumn, rightColumn] = convertToColumns(input);

  const rightCountMap = new Map<number, number>();
  for (const rightValue of rightColumn) {
    rightCountMap.set(rightValue, (rightCountMap.get(rightValue) || 0) + 1);
  }

  let score = 0;
  for (const leftValue of leftColumn) {
    const countInRight = rightCountMap.get(leftValue) || 0;
    score += leftValue * countInRight;
  }

  return score;
};
