// import { countIncreases, countMeasurementIncreases } from "../src/day01";
import { first, second } from "../src/day03";

const input = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010

`;

test("day 3-1", () => expect(first(input)).toBe(198));

test("day 3-2", () => expect(second(input)).toBe(230));
