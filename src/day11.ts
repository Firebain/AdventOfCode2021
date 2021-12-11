type Point = [number, number];

const parse = (str: string) =>
  str
    .trim()
    .split("\n")
    .map((s) => s.split("").map(Number));

const getNeighbours = (point: Point): Point[] =>
  [-1, 0, 1]
    .flatMap((x) => [-1, 0, 1].map((y): [number, number] => [x, y]))
    .map(([x, y]) => [point[0] + x, point[1] + y]);

const step = (map: number[][]): number[][] => {
  const queue: Point[] = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 9) {
        queue.push([x, y]);
      } else {
        map[y][x] += 1;
      }
    }
  }

  while (queue.length > 0) {
    const point = queue.pop()!;

    if (map[point[1]][point[0]] === 0) {
      continue;
    }

    map[point[1]][point[0]] = 0;

    for (const ne of getNeighbours(point)) {
      const num = map[ne[1]]?.[ne[0]];

      if (!num) {
        continue;
      }

      if (num === 9) {
        queue.push(ne);
      } else {
        map[ne[1]][ne[0]] += 1;
      }
    }
  }

  return map;
};

export const first = (input: string) => {
  let data = parse(input);

  let counter = 0;
  for (let i = 0; i < 100; i++) {
    const res = step(data);

    counter += res.flatMap((a) => a.filter((n) => n === 0)).length;
    data = res;
  }

  return counter;
};

export const second = (input: string) => {
  let data = parse(input);

  let turn = 0;
  while (true) {
    turn += 1;

    const res = step(data);

    if (res.every((a) => a.every((n) => n === 0))) {
      break;
    }

    data = res;
  }

  return turn;
};
