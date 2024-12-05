import { countWith, makeNumberMatrix } from "../utils";
/***
 * Day 5: Print Queue
 */

export const solutionA = (input: string) => {
  const [block1, block2] = input.split("\n\n");
  const rules = makeNumberMatrix(block1, "|");
  const nums = makeNumberMatrix(block2, ",");

  const isValid = (num: number[]) => {
    for (let rule of rules) {
      let idx1 = num.indexOf(rule[0]);
      let idx2 = num.indexOf(rule[1]);

      if (idx1 >= 0 && idx2 >= 0 && idx1 > idx2) {
        return false;
      }
    }
    return true;
  };

  const result = countWith(nums, (num) => {
    if (isValid(num)) {
      return num[Math.floor(num.length / 2)];
    }
    return 0;
  });

  console.log(result);
};

export const solutionB = (input: string) => {
  const [block1, block2] = input.split("\n\n");
  const rules = makeNumberMatrix(block1, "|");
  const nums = makeNumberMatrix(block2, ",");

  const isValid = (num: number[]) => {
    for (let rule of rules) {
      let idx1 = num.indexOf(rule[0]);
      let idx2 = num.indexOf(rule[1]);

      if (idx1 >= 0 && idx2 >= 0 && idx1 > idx2) {
        return false;
      }
    }
    return true;
  };

  const result = countWith(nums, (num) => {
    if (!isValid(num)) {
      // Sort by the rules
      let newNum = num.toSorted((a, b) =>
        rules.some((r) => r[0] === a && r[1] === b) ? -1 : 1
      );
      return newNum[Math.floor(num.length / 2)];
    }
    return 0;
  });

  console.log(result);
};
