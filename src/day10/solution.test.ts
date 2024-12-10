import { part1, part2 } from './solution';
import { readTestInput } from '../utils/readInput';

describe('Day 10', () => {
  const input = readTestInput('day10')

  it('part 1', () => {
    expect(part1(input)).toBe(36);
  });

  it('part 2', () => {
    expect(part2(input)).toBe(81);
  });
});
