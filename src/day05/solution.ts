const convertToSections = (input: string) => {
  const [orderingRulesSection, updatesSection] = input.trim().split('\n\n');

  const orderingRules = orderingRulesSection.split('\n').map(line => {
    return line.split('|').map(Number);
  });

  const updates = updatesSection.split('\n').map(line =>
    line.split(',').map(Number)
  );

  return {
    orderingRules,
    updates,
  }
}

const convertToMap = (rules: number[][]) => {
  const orderingMap = new Map();
  for (let index = 0; index < rules.length; index++) {
    const [p1, p2] = rules[index];

    if (!orderingMap.has(p1)) {
      orderingMap.set(p1, new Set());
    }

    orderingMap.get(p1)!.add(p2);
  }

  return orderingMap;
}

export const part1 = (input: string): number => {
  const { orderingRules, updates } = convertToSections(input);

  const orderingMap = convertToMap(orderingRules);

  const validUpdates = updates.filter((update) => {
    for (let i = 0; i < update.length; i++) {
      for (let j = i + 1; j < update.length; j++) {
        const before = update[i];
        const after = update[j];
        if (orderingMap.get(after)?.has(before)) {
          return false;
        }
      }
    }
    return true;
  })


  const middlePages = validUpdates.map(update => update[Math.floor(update.length / 2)]);
  return middlePages.reduce((total, pageNumber) => total + pageNumber, 0);
};

export const part2 = (input: string): number => {
  return 0
};
