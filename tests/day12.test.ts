import { first, second } from "../src/day12";
import input from "./samples/day12";

test("day 12-1", () => expect(first(input)).toBe(226));

test("day 12-2", () => expect(second(input)).toBe(3509));
