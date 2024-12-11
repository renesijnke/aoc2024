// Special thanks to @grdw

// Helper function to get digit length
function digitLength(stone: number): number {
  return Math.floor(Math.log10(stone)) + 1;
}

function countStones(stones: number[], blinks: number): number {
  let map = new Map<number, number>();

  for (const stone of stones) {
    map.set(stone, 1);
  }

  for (let i = 0; i < blinks; i++) {
    let cache = new Map<number, number>();

    for (const [stone, count] of map.entries()) {
      if (stone === 0) {
        cache.set(1, (cache.get(1) || 0) + count);
      } else {
        const dl = digitLength(stone);
        if (dl % 2 === 0) {
          const middle = Math.pow(10, Math.floor(dl / 2));
          const left = Math.floor(stone / middle);
          const right = stone - (left * middle);

          cache.set(left, (cache.get(left) || 0) + count);
          cache.set(right, (cache.get(right) || 0) + count);
        } else {
          cache.set(stone * 2024, (cache.get(stone * 2024) || 0) + count);
        }
      }
    }
    map = cache;
  }

  return Array.from(map.values()).reduce((a, b) => a + b, 0);
}

export const part1 = (input: string): number => {
  const stones = input.split(' ').map(Number);
  return countStones(stones, 25);
};

export const part2 = (input: string): number => {
  const stones = input.split(' ').map(Number);
  return countStones(stones, 75);
};