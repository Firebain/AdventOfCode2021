import { first, second } from "../src/day05";
import input from "./samples/day05";

test("day 5-1", () => expect(first(input)).toBe(5));

test("day 5-2", () => expect(second(input)).toBe(12));
