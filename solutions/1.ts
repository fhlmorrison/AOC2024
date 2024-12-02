import { countWith, makeCount, makeLines, makeNumbers, makeWords, zip } from "../utils";

/***
 * Day 1: Historian Hysteria
 */

export const solutionA = (input: string) => {

    const left: number[] = [];
    const right: number[] = [];

    makeLines(input).forEach((line) => {
        const [a, b] = makeNumbers(line);
        left.push(a);
        right.push(b);
    });

    left.sort();
    right.sort();

    const pairs = zip(left, right);

    const result = countWith(pairs, ([a, b]) => Math.abs(a - b));

    console.log(result);
}

export const solutionB = (input: string) => {

    const left: number[] = [];
    const right: number[] = [];

    makeLines(input).forEach((line) => {
        const [a, b] = makeNumbers(line);
        left.push(a);
        right.push(b);
    });

    const count = makeCount(right);

    const result = countWith(left, (ele) => ele * (count.get(ele) || 0));

    console.log(result);
}