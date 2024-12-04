import { part1, part2 } from './solution';
import { readTestInput } from '../utils/readInput';

describe('Day 3', () => {
  const inputPart1 = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';
  const inputPart2 = 'xmul(2,4)&mul[3,7]!^don\'t()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))';

  test('part 1', () => {
    expect(part1(inputPart1)).toBe(161);
  });

  test('part 2', () => {
    expect(part2(inputPart2)).toBe(48);
  });
});
