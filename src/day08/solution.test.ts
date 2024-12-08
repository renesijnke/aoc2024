import { part1, part2 } from './solution';
import { readTestInput } from '../utils/readInput';

describe('Day 8', () => {
  const input = readTestInput('day08')

  test('part 1', () => {
    expect(part1(input)).toBe(14);
  });

  test('part 2', () => {
    expect(part2(input)).toBe(34);
  });
});
