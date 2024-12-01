/***
 * Utility functions added here when I think
 * they might be useful for multiple problems
 */

export function zip<T>(arr1: Array<T>, arr2: Array<T>): Array<[T, T]> {
    return arr1.map((val, i) => [val, arr2[i]]);
}

export function countIf<T>(arr: Array<T>, predicate: (val: T) => boolean): number {
    return arr.reduce((acc, val) => acc + (predicate(val) ? 1 : 0), 0);
}

export function makeCount<T>(arr: Array<T>): Map<T, number> {
    const counter = new Map<T, number>();

    arr.forEach(ele => {
        const curr = counter.get(ele);
        if (curr) {
            counter.set(ele, curr + 1);
        } else {
            counter.set(ele, 1);
        }
    });

    return counter;
}

export function makeLines(input: string): string[] {
    const lines = input.split(/\n/);
    // Remove the last line if it's empty
    if (lines[lines.length - 1] === "") {
        lines.pop();
    }
    return lines;
}

export function makeWords(input: string): string[] {
    return input.split(/\s+/);
}