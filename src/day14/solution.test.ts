import { part1, part2, calculateRobotEndPosition, convertToRobots } from './solution';
import { readTestInput } from '../utils/readInput';

describe('Day 14', () => {
  const input = readTestInput('day14')

  it('part 1', () => {
    expect(part1(input, { rows: 7, cols: 11 })).toBe(12);
  });

  xit('part 2', () => {
    expect(part2(input)).toBe(0);
  });

  describe('calculateRobotEndPosition method', () => {
    it('calculates robots end position based on robot properties and space', () => {
      const robots = convertToRobots('p=2,4 v=2,-3')
      expect(calculateRobotEndPosition(robots[0], { rows: 7, cols: 11 }, 5)).toStrictEqual({ "x": 1, "y": 3 });
    });
  })
});
