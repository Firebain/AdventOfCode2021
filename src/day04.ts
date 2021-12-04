type Board = number[][];

const parse = (str: string): [number[], Board[]] => {
  const [rawNumbers, ...rawBoards] = str.trimEnd().split("\n\n");

  const numbers = rawNumbers.split(",").map(Number);

  const boards = rawBoards.map((c) =>
    c.split("\n").map((s) =>
      s
        .split(" ")
        .filter((i) => i !== "")
        .map(Number)
    )
  );

  return [numbers, boards];
};

const play = <R>(
  numbers: number[],
  boards: Board[],
  onWin: (number: number) => R
) => {
  const marks = [];
  const won: number[] = [];

  for (const number of numbers) {
    marks.push(number);

    for (const [index, board] of boards.entries()) {
      if (won.includes(index)) {
        continue;
      }

      for (let i = 0; i < 5; i++) {
        let rowFilled = true;
        let columnFilled = true;

        for (let j = 0; j < 5; j++) {
          if (!marks.includes(board[i][j])) {
            rowFilled = false;
          }

          if (!marks.includes(board[j][i])) {
            columnFilled = false;
          }
        }

        if (rowFilled || columnFilled) {
          let sum = 0;

          for (let k = 0; k < 5; k++) {
            for (let e = 0; e < 5; e++) {
              if (!marks.includes(board[k][e])) {
                sum += board[k][e];
              }
            }
          }

          const res = onWin(sum * number);

          if (res) {
            return res;
          }

          won.push(index);
        }
      }
    }
  }
};

export const first = (input: string) => {
  const [numbers, boards] = parse(input);

  return play(numbers, boards, (num) => num);
};

export const second = (input: string) => {
  const [numbers, boards] = parse(input);

  let lastWin = 0;

  play(numbers, boards, (num) => {
    lastWin = num;
  });

  return lastWin;
};
