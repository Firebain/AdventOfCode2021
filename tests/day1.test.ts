// import { countIncreases, countMeasurementIncreases } from "../src/day01";
import { first, second } from "../src/day01";

test("day 1-1", () => {
  const reports = `
    199
    200
    208
    210
    200
    207
    240
    269
    260
    263
  `;
  expect(first(reports)).toBe(7);
});

test("day 1-2", () => {
  const reports = `
    199
    200
    208
    210
    200
    207
    240
    269
    260
    263
  `;
  expect(second(reports)).toBe(5);
});
