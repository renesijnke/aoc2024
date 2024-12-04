import { part1, part2 } from './solution';
import { readTestInput } from '../utils/readInput';

describe('Day 2', () => {
  const input = readTestInput('day02');

  test('part 1', () => {
    expect(part1(input)).toBe(2);
  });

  test('part 2', () => {
    expect(part2(input)).toBe(4);
  });
});
