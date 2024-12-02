import { countIf, makeLines, makeNumberMatrix, makeWords, windows } from "../utils";

/***
 * Day 0: Red-Nosed Reports
 */

// Check if a record is safe
const isSafe = (num: number[]) => {
    let dir = Math.sign(num[0] - num[1]);

    return windows(num, 2).every(([a, b]) => {
        const diff = a - b;
        const abs = Math.abs(diff);
        return abs <= 3 && abs >= 1 && Math.sign(diff) === dir;
    });
}

// Try removing each element and checking if the record is safe
// Also does 0 case of not removing anything
const isSafe2 = (num: number[]) => {
    for (let i = 0; i < num.length; i++) {
        const modified = [...num.slice(0, i), ...num.slice(i + 1)];
        if (isSafe(modified)) {
            return true;
        }
    }
    return false;
};


export const solutionA = (input: string) => {

    const nums = makeNumberMatrix(input);

    console.log(countIf(nums, isSafe));
}

export const solutionB = (input: string) => {

    const nums = makeNumberMatrix(input);

    console.log(countIf(nums, isSafe2));
}