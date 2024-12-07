import { part1, part2 } from './solution';
import { readTestInput } from '../utils/readInput';

describe('Day 7', () => {
  const input = readTestInput('day07')

  test('part 1', () => {
    expect(part1(input)).toBe(3749);
  });

  test('part 2', () => {
    expect(part2(input)).toBe(11387);
  });
});
