interface EasyDigits {
  1: string;
  4: string;
  7: string;
  8: string;
}

const DIGITS_MAP: [string[], string][] = [
  [["a", "c", "f", "g", "e", "b"], "0"],
  [["c", "f"], "1"],
  [["a", "c", "d", "e", "g"], "2"],
  [["a", "c", "d", "f", "g"], "3"],
  [["b", "c", "d", "f"], "4"],
  [["a", "b", "d", "f", "g"], "5"],
  [["a", "b", "d", "f", "e", "g"], "6"],
  [["a", "c", "f"], "7"],
  [["a", "b", "c", "d", "e", "f", "g"], "8"],
  [["a", "b", "c", "d", "f", "g"], "9"],
];

const parse = (str: String) =>
  str
    .trim()
    .split("\n")
    .map(
      (l) => l.split(" | ").map((d) => d.split(" ")) as [string[], string[]]
    );

const easyDigits = (part: [string[], string[]]): EasyDigits => {
  const out: Partial<EasyDigits> = {};

  const digits = part.flat();

  for (const digit of digits) {
    if (digit.length === 2) out[1] = digit;
    if (digit.length === 4) out[4] = digit;
    if (digit.length === 3) out[7] = digit;
    if (digit.length === 7) out[8] = digit;
  }

  return out as EasyDigits;
};

const restoreSegments = (
  data: [string[], string[]]
): { [key: string]: string } => {
  const easy = easyDigits(data);

  const cf = easy[1].split("");

  const a = easy[7].split("").filter((n) => !cf.includes(n))[0];

  const bd = easy[4].split("").filter((n) => !cf.includes(n));

  const cfabd = [...cf, a, ...bd];

  const eg = easy[8].split("").filter((n) => !cfabd.includes(n));

  const abdfg = [...data[0], ...data[1]]
    .filter((n) => n.length === 5)
    .find((n) => bd.every((c) => n.includes(c)))!
    .split("");

  const c = cf.filter((n) => !abdfg.includes(n))[0];
  const f = cf.filter((n) => n !== c)[0];

  const acdeg = [...data[0], ...data[1]]
    .filter((n) => n.length === 5)
    .find((n) => !n.includes(f))!
    .split("");

  const aceg = [a, c, ...eg];

  const d = acdeg.filter((n) => !aceg.includes(n))[0];
  const b = bd.filter((n) => n !== d)[0];

  const abdf = [a, b, d, f];

  const g = abdfg.filter((n) => !abdf.includes(n))[0];
  const e = eg.filter((n) => n !== g)[0];

  return {
    [a]: "a",
    [b]: "b",
    [c]: "c",
    [d]: "d",
    [e]: "e",
    [f]: "f",
    [g]: "g",
  };
};

export const first = (input: string) =>
  parse(input)
    .flatMap((part) => part[1])
    .map((num) => num.length)
    .filter((num) => [2, 4, 3, 7].includes(num)).length;

export const second = (input: string) =>
  parse(input).reduce((acc, part) => {
    const segments = restoreSegments(part);

    const output = part[1]
      .map((n) => n.split(""))
      .map((n) => n.map((c) => segments[c]))
      .map(
        (numbers) =>
          DIGITS_MAP.find(
            (m) =>
              numbers.every((n) => m[0].includes(n)) &&
              m[0].every((n) => numbers.includes(n))
          )![1]
      )
      .join("");

    return acc + Number(output);
  }, 0);
