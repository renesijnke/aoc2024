import { part1, part2, convertToBlocks } from './solution';
import { readTestInput } from '../utils/readInput';

describe('Day 9', () => {
  const input = readTestInput('day09')

  it('part 1', () => {
    expect(part1(input)).toBe(1928);
  });

  it('part 2', () => {
    expect(part2(input)).toBe(2858);
  });

  it('convertToBlocks method', () => {
    expect(convertToBlocks(input).join('')).toEqual('00...111...2...333.44.5555.6666.777.888899');
  });
});
