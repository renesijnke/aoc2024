import { part1, part2 } from './solution';
import { readTestInput } from '../utils/readInput';

describe('Day 6', () => {
  const input = readTestInput('day06')

  test('part 1', () => {
    expect(part1(input)).toBe(41);
  });

  test('part 2', () => {
    expect(part2(input)).toBe(6);
  });
});
