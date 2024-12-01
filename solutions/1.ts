import { makeCount, makeLines, makeWords, zip } from "../utils";

/***
 * Day 1: Historian Hysteria
 */

export const solutionA = (input: string) => {

    const left: number[] = [];
    const right: number[] = [];

    makeLines(input).forEach((line) => {
        const [a, b] = makeWords(line);
        left.push(parseInt(a));
        right.push(parseInt(b));
    });

    left.sort();
    right.sort();

    const pairs = zip(left, right);

    let acc = 0;

    pairs.forEach(([a, b]) => {
        acc += Math.abs(a - b);
    });

    console.log(acc);
}

export const solutionB = (input: string) => {

    const left: number[] = [];
    const right: number[] = [];

    makeLines(input).forEach((line) => {
        const [a, b] = makeWords(line);
        left.push(parseInt(a));
        right.push(parseInt(b));
    });

    const count = makeCount(right);

    let acc = 0;

    left.forEach((ele) => {
        acc += ele * (count.get(ele) || 0);
    });

    console.log(acc);
}