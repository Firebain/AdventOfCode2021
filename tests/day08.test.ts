import { first, second } from "../src/day08";
import input from "./samples/day08";

test("day 8-1", () => expect(first(input)).toBe(26));

test("day 8-2", () => expect(second(input)).toBe(61229));
