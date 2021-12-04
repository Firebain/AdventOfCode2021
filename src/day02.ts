type Direction = "forward" | "down" | "up";

type Command = [Direction, number];

const parse = (data: string) =>
  data
    .split("\n")
    .map((data) => data.split(" "))
    .map(
      ([direction, units]): Command => [direction as Direction, parseInt(units)]
    );

export const first = (input: string) => {
  const commands = parse(input);

  let position = {
    horizontal: 0,
    depth: 0,
  };

  for (const command of commands) {
    switch (command[0]) {
      case "forward":
        position.horizontal += command[1];

        break;
      case "up":
        position.depth -= command[1];

        break;
      case "down":
        position.depth += command[1];

        break;
    }
  }

  return position.horizontal * position.depth;
};

export const second = (input: string) => {
  const commands = parse(input);

  let position = {
    aim: 0,
    horizontal: 0,
    depth: 0,
  };

  for (const command of commands) {
    switch (command[0]) {
      case "forward":
        position.horizontal += command[1];
        position.depth += position.aim * command[1];

        break;
      case "up":
        position.aim -= command[1];

        break;
      case "down":
        position.aim += command[1];

        break;
    }
  }

  return position.horizontal * position.depth;
};
