import { first, second } from "../src/day01";
import input from "./samples/day01";

test("day 1-1", () => expect(first(input)).toBe(7));

test("day 1-2", () => expect(second(input)).toBe(5));
