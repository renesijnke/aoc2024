interface Line {
  numbers: number[],
  result: number;
}

const convertToLines = (input: string) => {
  return input.trim().split('\n').reduce<Line[]>((acc, line) => {
    const [result, numbers] = line.split(':');
    acc.push({
      numbers: numbers.trim().split(' ').map(Number),
      result: Number(result),
    })
    return acc;
  }, []);
}

function isValidEquation(target: number, numbers: number[], allowConcatenation: boolean = false): boolean {
  function evaluate(currentValue: number, remainingNumbers: number[]): boolean {
    if (remainingNumbers.length === 0) {
      return currentValue === target;
    }

    const nextNum = remainingNumbers[0];
    const rest = remainingNumbers.slice(1);

    if (evaluate(currentValue * nextNum, rest)) return true;

    if (evaluate(currentValue + nextNum, rest)) return true;

    if (allowConcatenation) {
      const concatenated = Number(`${currentValue}${nextNum}`);
      if (evaluate(concatenated, rest)) return true;
    }

    return false;
  }

  return evaluate(numbers[0], numbers.slice(1));
}

export const part1 = (input: string): number => {
  const lines = convertToLines(input);
  return lines
    .filter(line => isValidEquation(line.result, line.numbers))
    .reduce((sum, line) => sum + line.result, 0);
};

export const part2 = (input: string): number => {
  const lines = convertToLines(input);
  return lines
    .filter(line => isValidEquation(line.result, line.numbers, true))
    .reduce((sum, line) => sum + line.result, 0);
};