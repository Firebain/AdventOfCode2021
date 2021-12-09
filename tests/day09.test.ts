import { first, second } from "../src/day09";
import input from "./samples/day09";

test("day 9-1", () => expect(first(input)).toBe(15));

test("day 9-2", () => expect(second(input)).toBe(1134));
