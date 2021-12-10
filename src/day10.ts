const parse = (str: string): string[] => str.trim().split("\n");

const POINTS_TABLE: { [key: string]: number } = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const checker = (line: string): string => {
  const pairs = ["()", "{}", "[]", "<>"];

  for (const pair of pairs) {
    const index = line.indexOf(pair);

    if (index !== -1) {
      return checker(line.replace(pair, ""));
    }
  }

  return line;
};

const findIllegal = (line: string): string => {
  const index = Math.min(
    ...Object.keys(POINTS_TABLE)
      .map((c) => line.indexOf(c))
      .filter((v) => v !== -1)
  );

  return line[index];
};

export const first = (input: string) =>
  parse(input)
    .map(checker)
    .map(findIllegal)
    .filter((v) => v !== undefined)
    .map((c) => POINTS_TABLE[c])
    .reduce((a, b) => a + b);

export const second = (input: string) => {
  const results = parse(input)
    .map(checker)
    .filter((res) => findIllegal(res) === undefined)
    .map((res) =>
      res
        .split("")
        .reverse()
        .map((c) => "([{<".indexOf(c) + 1)
        .reduce((a, b) => a * 5 + b)
    )
    .sort((a, b) => a - b);

  return results[Math.floor(results.length / 2)];
};
