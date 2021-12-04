import { first, second } from "../src/day02";
import input from "./samples/day02";

test("day 2-1", () => expect(first(input)).toBe(150));

test("day 2-2", () => expect(second(input)).toBe(900));
