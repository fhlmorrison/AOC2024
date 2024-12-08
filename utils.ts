/***
 * Utility functions added here when I think
 * they might be useful for multiple problems
 */

/**
 * Creates an array of pairs of elements from arr1 and arr2
 * @param arr1 array to zip with arr2
 * @param arr2 array to zip with arr1
 * @returns array of pairs of elements from arr1 and arr2
 */
export function zip<T>(arr1: Array<T>, arr2: Array<T>): Array<[T, T]> {
  return arr1.map((val, i) => [val, arr2[i]]);
}

/**
 * Counts the number of elements in arr that satisfy predicate
 * @param arr array to count with
 * @param predicate function to test each element
 * @returns count of elements satisfying predicate
 */
export function countIf<T>(
  arr: Array<T>,
  predicate: (currentValue: T, currentIndex: number, array: T[]) => boolean
): number {
  return arr.reduce(
    (acc, val, idx, arr) => acc + (predicate(val, idx, arr) ? 1 : 0),
    0
  );
}

/**
 * Checks if x and y are within the bounds of matrix
 * @param matrix Matrix to check bounds of
 * @param x X coordinate to check
 * @param y Y coordinate to check
 * @returns true if x and y are within the bounds of matrix, false otherwise
 */
export const checkMatrixBounds = (matrix: string[][], x: number, y: number) => {
  return x >= 0 && x < matrix.length && y >= 0 && y < matrix[0].length;
};

/**
 * Sums the result of applying F to each element in arr
 * @param arr array to count with
 * @param F function to generate a number from each element
 * @returns sum of F applied to each element in arr
 */
export function countWith<T>(
  arr: Array<T>,
  F: (val: T, index: number, array: T[]) => number
): number {
  return arr.reduce((acc, val, i, arr) => acc + F(val, i, arr), 0);
}

/**
 * Creates a map of elements to their counts (frequency)
 * @param arr Array to count elements of
 * @returns Map of elements to their counts
 */
export function makeCount<T>(arr: Array<T>): Map<T, number> {
  const counter = new Map<T, number>();

  arr.forEach((ele) => {
    const curr = counter.get(ele);
    if (curr) {
      counter.set(ele, curr + 1);
    } else {
      counter.set(ele, 1);
    }
  });

  return counter;
}

/**
 * Split a string into lines using newline as delimiter
 * (also removes empty last line)
 * @param input string to split into lines
 * @returns array of lines from input
 */
export function makeLines(input: string): string[] {
  const lines = input.split(/\n/);
  // Remove the last line if it's empty
  if (lines[lines.length - 1] === "") {
    lines.pop();
  }
  return lines;
}

/**
 * Splits a string into words using delimiter (defaults to whitespace)
 * @param input string to split into words
 * @param delimiter delimiter to split words on (defaults to whitespace)
 * @returns array of words from input
 */
export function makeWords(
  input: string,
  delimiter: string | RegExp = /\s+/
): string[] {
  return input.split(delimiter);
}

/**
 * Splits a string into words using delimiter (defaults to whitespace)
 * @param input string to split into words
 * @param delimiter delimiter to split words on (defaults to whitespace)
 * @returns array of words from input
 */
export function makeChars(
  input: string,
  delimiter: string | RegExp = /\s+/
): string[] {
  return input.split(delimiter);
}

/**
 * Splits row into numbers using delimiter (defaults to whitespace)
 * @param input string to convert to numbers
 * @param delimiter delimiter to split numbers on (defaults to whitespace)
 * @returns array of numbers from input
 */
export function makeNumbers(
  input: string,
  delimiter: string | RegExp = /\s+/
): number[] {
  return makeWords(input, delimiter).map(Number);
}

/**
 * Makes a matrix of strings from a string
 * @param input string to convert to matrix
 * @param delimiter delimiter to split words on (defaults to whitespace)
 * @returns Nested arrays of strings from input [row][col]
 */
export function makeMatrix(
  input: string,
  delimiter: string | RegExp = /\s+/
): string[][] {
  return makeLines(input).map((line) => line.split(delimiter));
}

/**
 * Makes a matrix of char from a string
 * @param input string to convert to matrix
 * @returns Nested arrays of chars from input [row][col]
 */
export function makeCharMatrix(input: string): string[][] {
  return makeLines(input).map((line) => line.split(""));
}

/**
 * Makes a matrix of numbers from a string
 * @param input string to convert to matrix
 * @param delimiter delimiter to split numbers on (defaults to whitespace)
 * @returns Nested arrays of numbers from input [row][col]
 */
export function makeNumberMatrix(
  input: string,
  delimiter: string | RegExp = /\s+/
): number[][] {
  return makeLines(input).map((line) => line.split(delimiter).map(Number));
}

export function copyMatrix<T>(matrix: T[][]) {
  return matrix.map((r) => [...r]);
}

/**
 * Creates windows of size size from arr
 * @param arr array to split into windows
 * @param size size of each window
 * @returns array of windows of arr of size size
 */
export function windows<T>(arr: T[], size: number): T[][] {
  return arr
    .map((_, i) => arr.slice(i, i + size))
    .filter((sub) => sub.length === size);
}

/**
 * Object mapping directions to pairs of [dx, dy]
 * (does not include center [0, 0])
 * @example DIRECTIONS_MAP["E"] -> [0, 1]
 */
export const DIRECTIONS_MAP = {
  N: [-1, 0],
  E: [0, 1],
  S: [1, 0],
  W: [0, -1],
  NW: [-1, -1],
  NE: [-1, 1],
  SE: [1, 1],
  SW: [1, -1],
};

/**
 * Array of directions as pairs of [dx, dy]
 * (does not include center [0, 0])
 * @example DIRECTIONS_ARRAY[0] -> [0, 1] // E
 */
export const OCTO_DIRECTIONS = Object.values(DIRECTIONS_MAP);

/**
 * Array of directions as pairs of [dx, dy]
 * (does not include center [0, 0])
 * Order is N, E, S, W (clockwise)
 * @example QUAD_DIRECTIONS[0] -> [0, 1] // E
 */
export const QUAD_DIRECTIONS = OCTO_DIRECTIONS.slice(0, 4);

/**
 * Array of offsets for a 9-grid as pairs of [dx, dy]
 * (includes center [0, 0])
 * @example NINE_GRID_OFFSETS[0] -> [0, 0] // Center
 */
export const NINE_GRID_OFFSETS = [[0, 0], ...OCTO_DIRECTIONS];

/**
 * Generates all permutations of length length with values from 0 to n - 1 (duplicate values allowed)
 * Only works for n <= 10
 * @param n Number of possible values for each position
 * @param length Length of permutations
 * @returns Array of all permutations of length length with values from 0 to n - 1
 */
export const generatePermutations = (n: number, length: number) => {
  const permutations = [];
  for (let i = 0; i < n ** length; i++) {
    const ternary = i.toString(n).padStart(length, "0");
    permutations.push(ternary.split("").map((t) => Number(t)));
  }
  return permutations;
};

/**
 * Generates greatest common divisor of a and b
 * @param a First number
 * @param b Second number
 * @returns Greatest common divisor of a and b
 */
export const greatestCommonDivisor = (a: number, b: number): number => {
  if (b === 0) {
    return a;
  }
  return greatestCommonDivisor(b, a % b);
};

/**
 * Generates least common multiple of a and b
 * @param a First number
 * @param b Second number
 * @returns Least common multiple of a and b
 */
export const leastCommonMultiple = (a: number, b: number): number => {
  return (a * b) / greatestCommonDivisor(a, b);
};
