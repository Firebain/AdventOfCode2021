import { first, second } from "../src/day11";
import input from "./samples/day11";

test("day 11-1", () => expect(first(input)).toBe(1656));

test("day 11-2", () => expect(second(input)).toBe(195));
