export const convertToBlocks = (input: string) => {
  let id = 0;
  let fileId = 0;
  let output = [];

  for (const char of input) {
    if (char === '0') {
      id++;
      continue;
    };
    const isFileBlock = id % 2 === 0;
    const isFreeSpaceBlock = id % 2 === 1;

    for (let index = 0; index < Number(char); index++) {
      if (isFileBlock) output.push(fileId);
      if (isFreeSpaceBlock) output.push('.');
    }

    id++;
    if (isFileBlock) fileId++;
  }

  return output;
}

export const part1 = (input: string): number => {
  const fileBlock = convertToBlocks(input);

  let index = fileBlock.length - 1;
  while (index > -1) {
    if (fileBlock[index] === '.') {
      index--;
      continue;
    }

    if (fileBlock.indexOf('.') >= index) {
      break;
    }

    fileBlock[fileBlock.indexOf('.')] = fileBlock[index];
    fileBlock[index] = '.';

    index--;
  }

  let checksum = 0
  for (let index = 0; index < fileBlock.length; index++) {
    if (fileBlock[index] === '.') continue;
    checksum += Number(fileBlock[index]) * index
  }
  return checksum;
};

export const part2 = (input: string): number => {
  return 0;
};