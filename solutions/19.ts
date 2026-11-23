/***
 * Day 0: Template
 */

import { countIf, countWith, makeLines } from "../utils";

export const solutionA = (input: string) => {
  const [patternLine, designLines] = input.split("\n\n");
  const patterns = patternLine.split(",").map((p) => p.trim());
  const designs = makeLines(designLines);
  const patternSet = new Set(patterns);
  const longestPattern = patterns.reduce(
    (cur, p) => Math.max(cur, p.length),
    0,
  );

  const possible = countIf(designs, (d) => {
    const dp: boolean[] = Array(d.length).fill(false);
    dp[0] = true;
    for (let i = 0; i <= d.length; i++) {
      // Look back to earliest start of substring
      let start = Math.max(0, i - longestPattern);
      for (let j = start; j < i; j++) {
        if (dp[j] && patternSet.has(d.substring(j, i))) {
          //   console.log();
          dp[i] = true;
          break; // Only need one working combo to move on
        }
      }
    }
    return dp[d.length];
  });
  console.log(possible);
};

export const solutionB = (input: string) => {
  const [patternLine, designLines] = input.split("\n\n");
  const patterns = patternLine.split(",").map((p) => p.trim());
  const designs = makeLines(designLines);
  const patternSet = new Set(patterns);
  const longestPattern = patterns.reduce(
    (cur, p) => Math.max(cur, p.length),
    0,
  );

  const sum = countWith(designs, (d) => {
    // dp[i] is the number of ways to make d.substring(0, i) from patterns
    const dp: number[] = Array(d.length + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i <= d.length; i++) {
      // Look back to earliest start of substring
      let start = Math.max(0, i - longestPattern);
      for (let j = start; j < i; j++) {
        if (dp[j] && patternSet.has(d.substring(j, i))) {
          dp[i] += dp[j];
        }
      }
    }
    return dp[d.length];
  });
  console.log(sum);
};
