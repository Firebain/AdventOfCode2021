import { first, second } from "../src/day14";
import input from "./samples/day14";

test("day 14-1", () => expect(first(input)).toBe(1586.5));

test("day 14-2", () => expect(second(input)).toBe(2188189693527.5));
