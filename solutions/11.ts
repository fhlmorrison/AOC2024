import { countWith, makeNumbers, makeWords } from "../utils";

/***
 * Day 11: Plutonian Pebbles
 */

export const solutionA = (input: string) => {
  const nums = makeNumbers(input);

  let count = countStones(nums, 25);

  console.log(count);
};

export const solutionB = (input: string) => {
  const nums = makeNumbers(input);

  let count = countStones(nums, 75);

  console.log(count);
};

const countStones = (stones: number[], iter: number): number => {
  let cache = new Map<string, number>();

  const updateRecursively = (stone: number, iter: number): number => {
    // Base case
    if (iter <= 0) {
      return 1;
    }

    let cachedElement = cache.get(stone + "," + iter);
    if (cachedElement) {
      return cachedElement;
    }

    if (stone === 0) {
      let result = updateRecursively(1, iter - 1);
      cache.set(stone + "," + iter, result);
      return result;
    }

    let str = stone.toString();

    if (str.length % 2 === 0) {
      let left = str.slice(0, str.length / 2);
      let right = str.slice(str.length / 2);
      let result =
        updateRecursively(Number(left), iter - 1) +
        updateRecursively(Number(right), iter - 1);
      cache.set(stone + "," + iter, result);
      return result;
    }

    let result = updateRecursively(stone * 2024, iter - 1);
    cache.set(stone + "," + iter, result);
    return result;
  };

  return countWith(stones, (stone) => updateRecursively(stone, iter));
};
