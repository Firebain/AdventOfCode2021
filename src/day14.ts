import { pairs } from "./utils";

const parse = (str: string) => {
  const [templateRaw, insertionsRaw] = str.trim().split("\n\n");

  const template = templateRaw.split("");

  const insertions = Object.fromEntries(
    insertionsRaw.split("\n").map((s) => {
      const [pattern, char] = s.split(" -> ");

      const patternChars = pattern.split("");

      return [
        pattern,
        [`${patternChars[0]}${char}`, `${char}${patternChars[1]}`],
      ];
    })
  );

  return [template, insertions] as [string[], Record<string, [string, string]>];
};

const run = (input: string, steps: number) => {
  const [template, insertions] = parse(input);

  const something = pairs(template).map((a) => `${a[0]}${a[1]}` as string);

  let init: Record<string, number> = {};

  for (const val of something) {
    if (val in init) {
      init[val] += 1;
    } else {
      init[val] = 1;
    }
  }

  for (let i = 0; i < steps; i++) {
    let temp: Record<string, number> = {};

    for (const key in init) {
      if (init[key] > 0 && insertions[key]) {
        for (const k of insertions[key]) {
          if (k in temp) {
            temp[k] += init[key];
          } else {
            temp[k] = init[key];
          }
        }
      }
    }

    init = { ...temp };
  }

  let chars: Record<string, number> = {};

  for (const key in init) {
    const count = init[key];

    for (const char of key.split("")) {
      if (char in chars) {
        chars[char] += count / 2;
      } else {
        chars[char] = count / 2;
      }
    }
  }

  const result = Object.entries(chars)
    .map(([key, value]) => value)
    .sort((size, size2) => size2 - size);

  const max = result[0];
  const min = result[result.length - 1];

  return max - min - 1;
};

export const first = (input: string) => run(input, 10);

export const second = (input: string) => run(input, 40);
