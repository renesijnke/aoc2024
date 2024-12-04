import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export const readInput = (day: string): string => {
  const filePath = join(__dirname, '..', day, 'input.txt');
  if (!existsSync(filePath)) {
    throw new Error(`Input file not found: ${filePath}`);
  }
  return readFileSync(filePath, 'utf-8');
};

export const readTestInput = (day: string): string => {
  const filePath = join(__dirname, '..', day, 'input-test.txt');
  if (!existsSync(filePath)) {
    throw new Error(`Test input file not found: ${filePath}`);
  }
  return readFileSync(filePath, 'utf-8');
};
