import { part1, part2 } from './solution';
import { readTestInput } from '../utils/readInput';

describe('Day 18', () => {
  const input = readTestInput('day18')

  it('part 1', () => {
    expect(part1(input, 6, 12)).toBe(22);
  });

  it('part 2', () => {
    expect(part2(input, 6)).toBe('6,1');
  });
});
