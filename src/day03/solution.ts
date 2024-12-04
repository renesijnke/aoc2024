const replaceRange = (s: string, start: number, end: number, substitute: string = ''): string => {
  return s.substring(0, start) + substitute + s.substring(end);
}

export const part1 = (input: string): number => {
  const pattern = /mul\((\d+),(\d+)\)/gm;
  const matches = input.match(pattern);

  const result = matches?.reduce((total, match) => {
    const [first, last] = match.replace('mul(', '').replace(')', '').split(',').map(Number);
    return total + (first * last);
  }, 0)

  return result ?? 0;
};

export const part2 = (input: string): number => {
  let string = input;
  while (string.indexOf("don't()") > -1) {

    const indexDont = string.indexOf("don't()");
    const indexDo = string.indexOf("do()") === -1 ? string.length : string.indexOf("do()");

    if (indexDo < indexDont) {
      string = replaceRange(string, indexDo, indexDo + 4);
      continue;
    }

    string = replaceRange(string, indexDont, indexDo + 4);
  }

  const pattern = /mul\((\d+),(\d+)\)/gm;
  const matches = string.match(pattern);

  const result = matches?.reduce((total, match) => {
    const [first, last] = match.replace('mul(', '').replace(')', '').split(',').map(Number);
    return total + (first * last);
  }, 0)

  return result ?? 0;
};
