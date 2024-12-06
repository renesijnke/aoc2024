import { part1, part2 } from './solution';
import { readTestInput } from '../utils/readInput';

describe('Day 5', () => {
  const input = readTestInput('day05')

  test('part 1', () => {
    expect(part1(input)).toBe(143);
  });

  test('part 2', () => {
    expect(part2(input)).toBe(0);
  });
});
