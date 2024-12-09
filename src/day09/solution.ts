export const convertToBlocks = (input: string) => {
  let id = 0;
  let fileId = 0;
  let output = [];

  for (const char of input) {
    if (char === '0') {
      id++;
      continue;
    };

    for (let index = 0; index < Number(char); index++) {
      if (id % 2 === 0) {
        output.push(fileId);
      } else {
        output.push('.')
      };
    }
    if (id % 2 === 0) fileId++
    id++;
  }

  return output;
}

export const convertToBlocksMap = (input: string) => {
  let id = 0;
  let fileId = 0;
  let output = [];

  for (const char of input) {
    if (char === '0') {
      id++;
      continue;
    };

    const length = Number(input[id]);
    if (id % 2 === 0) {
      output.push({
        id: fileId,
        length,
      });
      fileId++;
    } else {
      output.push({
        id: '.',
        length
      })
    };

    id++;
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
  const fileBlock = convertToBlocksMap(input);

  const queue = fileBlock.filter((block) => block.id !== '.')
  while (queue.length > 0) {

    const file = queue.pop()!;
    const fileIndex = fileBlock.findIndex((block) => block.id === file.id);
    const freeSpaceIndex = fileBlock.findIndex((block) => block.id === '.' && block.length >= file.length);

    if (freeSpaceIndex === -1 || freeSpaceIndex >= fileIndex) continue;

    fileBlock[freeSpaceIndex].length = fileBlock[freeSpaceIndex].length - file.length;

    fileBlock.splice(freeSpaceIndex, 0, file);
    fileBlock.splice(fileIndex + 1, 1, { id: '.', length: file.length });
  }

  let id = 0;
  let checksum = 0;
  for (let i = 0; i < fileBlock.length; i++) {
    if (fileBlock[i].id == ".") id += fileBlock[i].length;
    else {
      for (let j = 0; j < fileBlock[i].length; j++) {
        checksum += id * Number(fileBlock[i].id);
        id++;
      }
    }
  }
  return checksum;
};