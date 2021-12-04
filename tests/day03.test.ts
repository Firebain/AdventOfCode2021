import { first, second } from "../src/day03";
import input from "./samples/day03";

test("day 3-1", () => expect(first(input)).toBe(198));

test("day 3-2", () => expect(second(input)).toBe(230));
