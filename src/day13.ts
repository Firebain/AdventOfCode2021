const parse = (str: string): [[number, number][], [string, number][]] => {
  const [dotsRaw, instructionsRaw] = str.trim().split("\n\n");

  const dots = dotsRaw
    .split("\n")
    .map((el) => el.split(",").map(Number) as [number, number]);

  const instructions = instructionsRaw
    .split("\n")
    .map((i) => i.split(" ")[2])
    .map((i) => [i.split("=")[0], Number(i.split("=")[1])] as [string, number]);

  return [dots, instructions];
};

const debug = (dots: [number, number][]) => {
  const maxX = Math.max(...dots.map((c) => c[0])) + 1;
  const maxY = Math.max(...dots.map((c) => c[1])) + 1;

  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      const contains = dots.some((el) => x === el[0] && y === el[1]);

      process.stdout.write(contains ? "#" : ".");
    }
    process.stdout.write("\n");
  }

  process.stdout.write("\n");
};

const fold = (
  dots: [number, number][],
  instruction: [string, number]
): [number, number][] => {
  const temp: [number, number][] = [];

  const addUnique = (arr: [number, number][], [x, y]: [number, number]) => {
    if (!arr.some((el) => x === el[0] && y === el[1])) {
      arr.push([x, y]);
    }
  };

  for (const dot of dots) {
    if (instruction[0] === "x" && dot[0] > instruction[1]) {
      const mirrorX = instruction[1] * 2 - dot[0];

      addUnique(temp, [mirrorX, dot[1]]);

      continue;
    }

    if (instruction[0] === "y" && dot[1] > instruction[1]) {
      const mirrorY = instruction[1] * 2 - dot[1];

      addUnique(temp, [dot[0], mirrorY]);

      continue;
    }

    addUnique(temp, dot);
  }

  return temp;
};

export const first = (input: string) => {
  let [dots, instructions] = parse(input);

  return fold(dots, instructions[0]).length;
};

export const second = (input: string) => {
  let [dots, instructions] = parse(input);

  debug(instructions.reduce(fold, dots));
};
