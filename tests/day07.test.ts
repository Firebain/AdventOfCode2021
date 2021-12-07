import { first, second } from "../src/day07";
import input from "./samples/day07";

test("day 7-1", () => expect(first(input)).toBe(37));

test("day 7-2", () => expect(second(input)).toBe(168));
