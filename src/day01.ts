const parse = (data: string) => data.split("\n").map(Number);

export const first = (input: string) => {
  const numbers = parse(input);

  let prev = Number.POSITIVE_INFINITY;
  let counter = 0;

  for (const num of numbers) {
    if (prev < num) {
      counter += 1;
    }

    prev = num;
  }

  return counter;
};

export const second = (input: string) => {
  const numbers = parse(input);

  let prev = Number.POSITIVE_INFINITY;
  let counter = 0;

  for (let i = 0; i < numbers.length - 2; i++) {
    const sum = numbers[i] + numbers[i + 1] + numbers[i + 2];

    if (prev < sum) {
      counter += 1;
    }

    prev = sum;
  }

  return counter;
};
