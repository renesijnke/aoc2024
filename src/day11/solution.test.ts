import { part1, part2 } from './solution';
import { readTestInput } from '../utils/readInput';

describe('Day 11', () => {
  const input = readTestInput('day11')

  it('part 1', () => {
    expect(part1(input)).toBe(55312);
  });

  it('part 2', () => {
    expect(part2(input)).toBe(65601038650482);
  });
});
