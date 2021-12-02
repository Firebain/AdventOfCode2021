// import { countIncreases, countMeasurementIncreases } from "../src/day01";
import { first, second } from "../src/day02";

const commands = `
    forward 5
    down 5
    forward 8
    up 3
    down 8
    forward 2
  `;

test("day 2-1", () => expect(first(commands)).toBe(150));

test("day 2-2", () => expect(second(commands)).toBe(900));
