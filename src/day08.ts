const parse = (str: String) =>
  str
    .trim()
    .split("\n")
    .map((l) => l.split(" | ").flatMap((d) => d.split(" ")));

const has = (str: string, search: string) =>
  search.split("").every((c) => str.includes(c));

const decode = (data: string[]): string[] => {
  const one = data.find((s) => s.length === 2)!;
  const four = data.find((s) => s.length === 4)!;
  const seven = data.find((s) => s.length === 3)!;
  const eight = data.find((s) => s.length === 7)!;

  const twoThreeFive = data.filter((s) => s.length === 5);

  const three = twoThreeFive.find((n) => has(n, one))!;

  const zeroSixNine = data.filter((s) => s.length === 6);

  const nine = zeroSixNine.find((n) => has(n, three))!;
  const five = twoThreeFive.find((n) => n !== three && has(nine, n))!;
  const two = twoThreeFive.find((n) => n !== three && n !== five)!;
  const six = zeroSixNine.find((n) => n !== nine && has(n, five))!;
  const zero = zeroSixNine.find((n) => n !== nine && n !== six)!;

  return [zero, one, two, three, four, five, six, seven, eight, nine];
};

export const first = (input: string) =>
  parse(input)
    .flatMap((part) => part.slice(-4))
    .map((num) => num.length)
    .filter((num) => [2, 4, 3, 7].includes(num)).length;

export const second = (input: string) =>
  parse(input)
    .map((data): [string[], string[]] => [decode(data), data])
    .map(([codes, data]) =>
      data
        .slice(-4)
        .map((num) => codes.findIndex((d) => has(d, num) && has(num, d)))
        .join("")
    )
    .reduce((acc, val) => acc + +val, 0);
