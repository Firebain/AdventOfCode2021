const parse = (str: string) => str.split(",").map(Number);

const triangular = (n: number): number => (n / 2) * (n + 1);

const compute = (input: string, fn: (to: number, pos: number) => number) => {
  const data = parse(input);

  const min = Math.min(...data);
  const max = Math.max(...data);

  const score = new Array(max - min + 1);

  for (let i = min; i <= max; i++) {
    score[i - min] = data.map((v) => fn(i, v)).reduce((a, b) => a + b);
  }

  return Math.min(...score);
};

export const first = (input: string) =>
  compute(input, (to, pos) => Math.abs(pos - to));

export const second = (input: string) =>
  compute(input, (to, pos) => triangular(Math.abs(pos - to)));
