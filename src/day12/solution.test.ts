import { part1, part2 } from './solution';
import { readTestInput } from '../utils/readInput';

describe('Day 12', () => {
  const input = readTestInput('day12')

  it('part 1', () => {
    expect(part1(input)).toBe(1930);
  });

  it('part 2', () => {
    expect(part2(input)).toBe(0);
  });
});
