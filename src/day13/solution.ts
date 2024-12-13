interface GAME {
  buttonA: string;
  buttonB: string;
  prizeLocation: string;
}

const BUTTON_A_TOKENS = 3;
const BUTTON_B_TOKENS = 1;

const convertToGames = (input: string): GAME[] => {
  const games: GAME[] = [];

  // Split input into groups of 3 lines
  const groups = input.trim().split('\n\n');

  for (const group of groups) {
    const lines = group.split('\n');

    // Extract coordinates using regex
    const buttonAMatch = lines[0].match(/X\+(\d+), Y\+(\d+)/);
    const buttonBMatch = lines[1].match(/X\+(\d+), Y\+(\d+)/);
    const prizeMatch = lines[2].match(/X=(\d+), Y=(\d+)/);

    if (buttonAMatch && buttonBMatch && prizeMatch) {
      games.push({
        buttonA: `${buttonAMatch[1]},${buttonAMatch[2]}`,
        buttonB: `${buttonBMatch[1]},${buttonBMatch[2]}`,
        prizeLocation: `${prizeMatch[1]},${prizeMatch[2]}`
      });
    }
  }

  return games;
};

const findCombination = (game: GAME, offset: number) => {
  // Solution based on a chat with Claude :see-no-evil:
  const [buttonAX, buttonAY] = game.buttonA.split(',').map(Number);
  const [buttonBX, buttonBY] = game.buttonB.split(',').map(Number);
  const [targetX, targetY] = game.prizeLocation.split(',').map(n => Number(n) + offset);

  // Create matrix of coefficients
  const determinant = buttonAX * buttonBY - buttonAY * buttonBX;
  if (determinant === 0) return 0; // No solution exists

  // Solve for number of button presses using Cramer's rule
  const buttonADeterminant = buttonBY * targetX - buttonBX * targetY;
  const buttonBDeterminant = buttonAX * targetY - buttonAY * targetX;

  // Check if we have a valid solution (integer values)
  if (buttonADeterminant % determinant !== 0 || buttonBDeterminant % determinant !== 0) {
    return 0; // No integer solution exists
  }

  const buttonAPresses = buttonADeterminant / determinant;
  const buttonBPresses = buttonBDeterminant / determinant;

  // Check if solution is valid (non-negative and within bounds)
  if (buttonAPresses < 0 || buttonBPresses < 0) {
    return 0;
  }

  // Calculate total tokens needed
  return buttonAPresses * BUTTON_A_TOKENS + buttonBPresses * BUTTON_B_TOKENS;
}

export const part1 = (input: string): number => {
  return convertToGames(input).map((game) => findCombination(game, 0)).reduce((total, tokens) => total + tokens, 0);
}

export const part2 = (input: string): number => {
  return convertToGames(input).map((game) => findCombination(game, 10000000000000)).reduce((total, tokens) => total + tokens, 0);
};