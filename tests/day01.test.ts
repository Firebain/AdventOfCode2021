// import { countIncreases, countMeasurementIncreases } from "../src/day01";
import { first, second } from "../src/day01";

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

test("day 1-1", () => expect(first(reports)).toBe(7));

test("day 1-2", () => expect(second(reports)).toBe(5));
