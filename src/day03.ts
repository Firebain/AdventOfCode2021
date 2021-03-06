import { flipArray } from "./utils";

const parse = (data: string) =>
  data.split("\n").map((e) => e.split("") as Bit[]);

type Bit = "0" | "1";

const findOccurrencies = (arr: Bit[]): [Bit, Bit] => {
  const occurrences = {
    "0": 0,
    "1": 0,
  };

  for (const bit of arr) {
    occurrences[bit] += 1;
  }

  if (occurrences["0"] === occurrences["1"]) {
    return ["1", "0"];
  }

  const sorted = Object.entries(occurrences).sort((a, b) => a[1] - b[1]);

  return [sorted[1][0] as Bit, sorted[0][0] as Bit];
};

export const first = (input: string) => {
  const data = parse(input);

  const mostCommonArray = [];
  const leastCommonArray = [];

  for (const arr of flipArray(data)) {
    const [most, least] = findOccurrencies(arr);

    mostCommonArray.push(most);
    leastCommonArray.push(least);
  }

  const gamma = parseInt(mostCommonArray.join(""), 2);
  const epsilon = parseInt(leastCommonArray.join(""), 2);

  return gamma * epsilon;
};

export const second = (input: string) => {
  const data = parse(input);

  let oxygenNumbers = [...data];
  let co2Numbers = [...data];

  for (let i = 0; i <= data[0].length; i++) {
    if (oxygenNumbers.length !== 1) {
      const [most] = findOccurrencies(flipArray(oxygenNumbers)[i]);

      oxygenNumbers = oxygenNumbers.filter((el) => el[i] === most);
    }

    if (co2Numbers.length !== 1) {
      const [_, least] = findOccurrencies(flipArray(co2Numbers)[i]);

      co2Numbers = co2Numbers.filter((el) => el[i] === least);
    }
  }

  const oxygen = parseInt(oxygenNumbers[0].join(""), 2);
  const co2 = parseInt(co2Numbers[0].join(""), 2);

  return oxygen * co2;
};
