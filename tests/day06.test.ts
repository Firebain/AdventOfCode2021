import { first, second } from "../src/day06";
import input from "./samples/day06";

test("day 6-1", () => expect(first(input)).toBe(5934));

test("day 6-2", () => expect(second(input)).toBe(26984457539));
