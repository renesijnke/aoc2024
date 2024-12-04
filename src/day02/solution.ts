const convertToReports = (input: string): number[][] => {
  return input.trim().split('\n').reduce<number[][]>((acc, line) => {
    const input = line.split(' ').map(Number);
    acc.push(input)
    return acc;
  }, []);
}

// Helper function to check if a report is safe
const isReportSafe = (report: number[]) => {
  const isIncreasing = report.every((number, index) =>
    index === 0 || number > report[index - 1]
  );

  const isDecreasing = report.every((number, index) =>
    index === 0 || number < report[index - 1]
  );

  const hasValidDiffs = report.every((number, index) =>
    index === 0 || (Math.abs(number - report[index - 1]) > 0 && Math.abs(number - report[index - 1]) < 4)
  );

  return (isIncreasing || isDecreasing) && hasValidDiffs;
}

export const part1 = (input: string): number => {
  const reports = convertToReports(input);

  let safeReports = 0;
  for (let index = 0; index < reports.length; index++) {
    const report = reports[index];

    const isIncreasingReport = report.every((number, index, array) => {
      if (index === 0) return true;
      const prev = array[index - 1];

      return number > prev ? true : false;
    });

    const isDecreasingReport = report.every((number, index, array) => {
      if (index === 0) return true;
      const prev = array[index - 1];

      return number < prev ? true : false;
    });

    const isSafeReport = report.every((number, index, array) => {
      if (index === 0) return true;
      const diff = Math.abs(number - array[index - 1]);
      return diff > 0 && diff < 4 ? true : false;
    });

    if (isSafeReport && (isIncreasingReport || isDecreasingReport)) {
      safeReports = safeReports + 1;
    }
  }

  return safeReports;
};

export const part2 = (input: string): number => {
  const reports = convertToReports(input);

  let safeReports = 0;
  for (let index = 0; index < reports.length; index++) {
    const report = reports[index];

    // Check if report is safe without any modifications
    if (isReportSafe(report)) {
      safeReports++;
      continue;
    }

    // Try removing each number one at a time to see if it makes the report safe
    for (let i = 0; i < report.length; i++) {
      const modifiedReport = [...report.slice(0, i), ...report.slice(i + 1)];
      if (isReportSafe(modifiedReport)) {
        safeReports++;
        break;
      }
    }
  }

  return safeReports
};
