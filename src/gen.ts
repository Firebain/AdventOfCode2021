import * as fs from "fs";
import * as path from "path";

const day = parseInt(process.argv[2], 10);
if (Number.isNaN(day) || day < 1 || day > 25) {
  console.error("You have to choose a day between 1 and 25");
  console.error("For example: node src/index.js 1");
  process.exit(1);
}

const paddedDay = day.toString().padStart(2, "0");

const sourceTemplate = `export const first = (input: string) => {
  return 1;
};

export const second = (input: string) => {
  return 1;
};
`;

const sampleTemplate = `export default \`\`;
`;

const testTemplate = `import { first, second } from "../src/day${paddedDay}";
import input from "./samples/day${paddedDay}";

test("day ${day}-1", () => expect(first(input)).toBe(2));

test("day ${day}-2", () => expect(second(input)).toBe(2));
`;

fs.writeFileSync(path.join(__dirname, `day${paddedDay}.ts`), sourceTemplate);
fs.writeFileSync(
  path.join(__dirname, "..", "tests", `day${paddedDay}.test.ts`),
  testTemplate
);
fs.writeFileSync(
  path.join(__dirname, "..", "tests", "samples", `day${paddedDay}.ts`),
  sampleTemplate
);

console.log("\x1b[42mSUCCESS\x1b[49m");
