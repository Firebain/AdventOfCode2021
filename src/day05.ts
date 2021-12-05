interface Point {
  x: number;
  y: number;
}

interface Line {
  from: Point;
  to: Point;
}

const parse = (str: string) =>
  str
    .trimEnd()
    .split("\n")
    .map((l) => l.split(" -> ").map((c) => c.split(",").map(Number)))
    .map(
      (l): Line => ({
        from: {
          x: l[0][0],
          y: l[0][1],
        },
        to: {
          x: l[1][0],
          y: l[1][1],
        },
      })
    );

const getHWLinePoints = (line: Line): Point[] => {
  const points: Point[] = [];

  const minX = Math.min(line.from.x, line.to.x);
  const maxX = Math.max(line.from.x, line.to.x);
  const minY = Math.min(line.from.y, line.to.y);
  const maxY = Math.max(line.from.y, line.to.y);

  if (line.from.x === line.to.x || line.from.y === line.to.y) {
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        points.push({ x, y });
      }
    }
  }

  return points;
};

const getLinePoints = (line: Line): Point[] => {
  const points: Point[] = [];

  let dx = Math.sign(line.to.x - line.from.x);
  let dy = Math.sign(line.to.y - line.from.y);

  let x = line.from.x;
  let y = line.from.y;

  while (true) {
    points.push({ x, y });

    if (x === line.to.x && y === line.to.y) {
      break;
    }

    x += dx;
    y += dy;
  }

  return points;
};

const allAxis = (lines: Line[], axis: "x" | "y") =>
  lines.flatMap((line) => Object.entries(line).flatMap((val) => val[1][axis]));

const compute = (input: string, fn: (line: Line) => Point[]) => {
  const lines = parse(input);

  const maxX = Math.max(...allAxis(lines, "x")) + 1;
  const maxY = Math.max(...allAxis(lines, "y")) + 1;

  const diagram: number[][] = new Array(maxY)
    .fill(0)
    .map(() => new Array(maxX).fill(0));

  for (const line of lines) {
    const points = fn(line);

    for (const point of points) {
      diagram[point.y][point.x] += 1;
    }
  }

  const overlaps = diagram.flat().filter((val) => val > 1).length;

  return overlaps;
};

export const first = (input: string) => compute(input, getHWLinePoints);

export const second = (input: string) => compute(input, getLinePoints);
