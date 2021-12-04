import { first, second } from "../src/day04";
import input from "./samples/day04";

test("day 4-1", () => expect(first(input)).toBe(4512));

test("day 4-2", () => expect(second(input)).toBe(1924));
