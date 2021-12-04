export const flipArray = <T>(m: T[][]) =>
  m[0].map((x, i) => m.map((x) => x[i]));
