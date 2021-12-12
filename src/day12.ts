interface Path {
  caves: string[];
  path: string;
}

const parse = (str: string) =>
  str
    .trim()
    .split("\n")
    .map((str): [string, string] => [str.split("-")[0], str.split("-")[1]]);

const compute = (
  input: string,
  filter: (path: Path) => (newPath: string) => boolean
) => {
  const map = parse(input);

  const getAvailablePaths = (map: [string, string][], cave: string): string[] =>
    map
      .filter((path) => path[0] === cave || path[1] === cave)
      .map((path) => path.find((path) => path !== cave)!);

  const queue = getAvailablePaths(map, "start").map(
    (path): Path => ({
      caves: [],
      path,
    })
  );

  let counter = 0;

  while (queue.length !== 0) {
    const path = queue.pop()!;

    const availablePaths = getAvailablePaths(map, path.path)
      .filter((path) => path !== "start")
      .filter(filter(path));

    for (const newPath of availablePaths) {
      if (newPath === "end") {
        counter += 1;

        continue;
      }

      queue.push({
        caves:
          path.path === path.path.toUpperCase()
            ? path.caves
            : [...path.caves, path.path],
        path: newPath,
      });
    }
  }

  return counter;
};

export const first = (input: string) =>
  compute(input, (path) => (p) => !path.caves.includes(p));

export const second = (input: string) =>
  compute(input, (path) => (p) => {
    const caves = [...path.caves];

    if (path.path === path.path.toLowerCase()) {
      caves.push(path.path);
    }

    return (
      [...new Set(caves)].length === caves.length || !path.caves.includes(p)
    );
  });
