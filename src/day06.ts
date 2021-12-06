const parse = (str: string) => str.split(",").map(Number);

export const simulate = (input: string, days: number) => {
  let state = parse(input).map((el): [number, number] => [el, 1]);

  for (let i = 0; i < days; i++) {
    let add = 0;

    for (let j = 0; j < state.length; j++) {
      if (state[j][0] === 0) {
        add += state[j][1];
        state[j][0] = 6;
      } else {
        state[j][0] -= 1;
      }
    }

    if (add !== 0) {
      state.push([8, add]);
    }
  }

  return state.reduce((acc, el) => acc + el[1], 0);
};

export const first = (input: string) => simulate(input, 80);

export const second = (input: string) => simulate(input, 256);
