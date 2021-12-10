import { first, second } from "../src/day10";
import input from "./samples/day10";

test("day 10-1", () => expect(first(input)).toBe(26397));

test("day 10-2", () => expect(second(input)).toBe(288957));
