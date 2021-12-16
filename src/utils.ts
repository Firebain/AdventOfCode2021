export const flipArray = <T>(m: T[][]) =>
  m[0].map((x, i) => m.map((x) => x[i]));

export const groupBy = <T>(m: T[], fn: (el: T) => string) => {
  const groups: Record<string, T[]> = {};

  for (const el of m) {
    const key = fn(el);

    if (key in groups) {
      groups[key].push(el);
    } else {
      groups[key] = [el];
    }
  }

  return groups;
};

export const pairs = <T>(m: T[]) => {
  const temp: [T, T][] = [];

  for (let i = 0; i < m.length - 1; i++) {
    temp.push([m[i], m[i + 1]]);
  }

  return temp;
};
