import {
  countWith,
  generatePermutations,
  makeLines,
  makeNumbers,
} from "../utils";
/***
 * Day 7: Bridge Repair
 */

export const solutionA = (input: string) => {
  const lines = makeLines(input);

  const result = countWith(lines, testLine);

  console.log(result);
};

export const solutionB = (input: string) => {
  const lines = makeLines(input);

  const result = countWith(lines, testLine2);

  console.log(result);
};

const testLine = (line: string) => {
  const [targetString, numString] = line.split(": ");
  const target = Number(targetString);
  const nums = makeNumbers(numString);

  return generatePermutations(2, nums.length - 1).some((permutation) => {
    const expression = permutation.reduce(
      (acc, p, i) => (p ? acc + nums[i + 1] : acc * nums[i + 1]),
      nums[0]
    );
    return expression === target;
  })
    ? target
    : 0;
};

const testLine2 = (line: string) => {
  const [targetString, numString] = line.split(": ");
  const target = Number(targetString);
  const nums = makeNumbers(numString);

  return generatePermutations(3, nums.length - 1).some((permutation) => {
    const expression = permutation.reduce((acc, p, i) => {
      switch (p) {
        case 0:
          return acc + nums[i + 1];
        case 1:
          return acc * nums[i + 1];
        case 2:
          return Number(acc + "" + nums[i + 1]);
      }
      return acc;
    }, nums[0]);
    return expression === target;
  })
    ? target
    : 0;
};
