import { flipArray } from "./utils";

type Board = number[][];

const parse = (str: string): [number[], Board[]] => {
  const [rawNumbers, ...rawBoards] = str.trimEnd().split("\n\n");

  const numbers = rawNumbers.split(",").map(Number);

  const boards = rawBoards
    .map((c) =>
      c.split("\n").map((s) =>
        s
          .split(" ")
          .filter((i) => i !== "")
          .map(Number)
      )
    )
    .map((a) => [...a, ...flipArray(a)]);

  return [numbers, boards];
};

const play = (numbers: number[], boards: Board[]) => {
  const marks: number[] = [];
  const won: number[] = [];

  const results: number[] = [];

  for (const number of numbers) {
    marks.push(number);

    for (const [index, board] of boards.entries()) {
      if (won.includes(index)) {
        continue;
      }

      if (board.some((chunk) => chunk.every((n) => marks.includes(n)))) {
        const sum =
          board
            .flat()
            .filter((n) => !marks.includes(n))
            .reduce((a, b) => a + b, 0) / 2;

        won.push(index);
        results.push(sum * number);
      }
    }
  }

  return results;
};

export const first = (input: string) => {
  const [numbers, boards] = parse(input);

  return play(numbers, boards)[0];
};

export const second = (input: string) => {
  const [numbers, boards] = parse(input);

  const results = play(numbers, boards);

  return results[results.length - 1];
};
