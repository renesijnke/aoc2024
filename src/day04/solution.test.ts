import { part1, part2 } from './solution';

describe('Day 4', () => {
  const inputPart1 = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

  const inputPart2 = `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`;

  test('part 1', () => {
    expect(part1(inputPart1)).toBe(18);
  });

  test('part 2', () => {
    expect(part2(inputPart2)).toBe(9);
  });
});
