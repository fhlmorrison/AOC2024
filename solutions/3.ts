import { countWith } from "../utils";
/***
 * Day 3: Mull It Over
 */

export const solutionA = (input: string) => {
  const matches = input.match(/mul\(\d*,\d*\)/g) ?? [];

  const result = countWith(matches, (match) => {
    const [a, b] = match.match(/\d+/g)?.map(Number) ?? [0, 0];
    return a * b;
  });

  console.log(result);
};

export const solutionB = (input: string) => {
  const matches = input.match(/mul\(\d*,\d*\)|do\(\)|don't\(\)/g) ?? [];

  let enabled = true;

  const result = countWith(matches, (match) => {
    if (match === "do()") {
      enabled = true;
      return 0;
    }
    if (match === "don't()") {
      enabled = false;
      return 0;
    }
    if (enabled) {
      const [a, b] = match.match(/\d+/g)?.map(Number) ?? [0, 0];
      return a * b;
    }
    return 0;
  });

  console.log(result);
};
