import { part1, part2 } from './solution';
import { readTestInput } from '../utils/readInput';

describe('Day 13', () => {
  const input = readTestInput('day13')

  it('part 1', () => {
    expect(part1(input)).toBe(480);
  });

  it('part 2', () => {
    expect(part2(input)).toBe(875318608908);
  });
});
