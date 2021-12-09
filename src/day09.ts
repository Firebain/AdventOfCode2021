const parse = (str: string) =>
  str
    .trim()
    .split("\n")
    .map((c) => c.split("").map(Number));

const getLowPoints = (data: number[][]): [number, number][] => {
  const points: [number, number][] = [];

  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      const directions = [
        data[y + 1]?.[x],
        data[y - 1]?.[x],
        data[y][x + 1],
        data[y][x - 1],
      ];

      if (directions.every((dir) => dir === undefined || data[y][x] < dir)) {
        points.push([x, y]);
      }
    }
  }

  return points;
};

const getBasins = (
  data: number[][],
  point: [number, number]
): [number, number][] => {
  const [x, y] = point;

  const basins: [number, number][] = [point];

  const directions: [number, number][] = [
    [x, y + 1],
    [x, y - 1],
    [x + 1, y],
    [x - 1, y],
  ];

  for (const dir of directions) {
    const risk = data[dir[1]]?.[dir[0]];

    if (risk !== undefined && risk !== 9 && risk > data[y][x]) {
      for (const basin of getBasins(data, dir)) {
        if (!basins.some(([x, y]) => x === basin[0] && y === basin[1])) {
          basins.push(basin);
        }
      }
    }
  }

  return basins;
};

export const first = (input: string) => {
  const data = parse(input);

  return getLowPoints(data)
    .map(([x, y]) => data[y][x])
    .reduce((a, b) => a + b + 1, 0);
};

export const second = (input: string) => {
  const data = parse(input);

  return getLowPoints(data)
    .map((p) => getBasins(data, p).length)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b);
};
