import { part1, part2 } from './solution';
import { readTestInput } from '../utils/readInput';

describe('Day 15', () => {
  const input = readTestInput('day15')

  it('part 1', () => {
    expect(part1(input)).toBe(2028);
  });

  it('part 2', () => {
    expect(part2(input)).toBe(0);
  });
});
