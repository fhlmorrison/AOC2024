/***
 * Day 9: Disk Fragmenter
 */

import { makeNumbers } from "../utils";

export const solutionA = (input: string) => {
  const digits = makeNumbers(input, "");

  // Expand the data
  let data = digits.reduce((acc: number[], x, i) => {
    const id = i % 2 === 0 ? i / 2 : -1;
    acc.push(...Array(x).fill(id));
    return acc;
  }, []);

  let head = 0;
  let tail = data.length - 1;

  // Perform swaps
  while (head < tail) {
    // FInd next empty space
    while (data[head] != -1) {
      head++;
    }
    // Find next file block
    while (tail > 0 && data[tail] == -1) {
      tail--;
    }
    if (head >= tail) {
      break;
    }
    data[head] = data[tail];
    data[tail] = -1;
  }

  // Checksum
  let res = data
    .map((x) => (x != -1 ? x : 0))
    .reduce((acc, x, i) => acc + i * x, 0);

  console.log(res);
};

export const solutionB = (input: string) => {
  // Split every pair of digits into a string
  const digits = makeNumbers(input, "");

  let files: { id: number; size: number }[] = digits.reduce(
    (acc: { id: number; size: number }[], x, i) => {
      const id = i % 2 === 0 ? i / 2 : -1;
      acc.push({ id, size: x });
      return acc;
    },
    []
  );

  let head = 0;
  let tail = files.length - 1;

  while (head < tail) {
    // Find next empty space
    while (files[head]?.id != -1) {
      head++;
    }
    // Find next highest id file
    while (tail > 0 && files[tail].id == -1) {
      tail--;
    }
    if (head >= tail) {
      break;
    }

    const fileSize = files[tail].size;
    const fileId = files[tail].id;

    // Try to find space for the file
    for (let i = head; i < tail; i++) {
      if (files[i].id === -1 && files[i].size >= fileSize) {
        // Move file into empty space
        files[i].size -= fileSize;
        files[tail].id = -1;
        files.splice(i, 0, {
          id: fileId,
          size: fileSize,
        });
        break;
      }
    }

    // Move to next file
    tail--;
  }

  // Expand the data
  const data = files.reduce((acc: number[], x) => {
    acc.push(...Array(x.size).fill(x.id));
    return acc;
  }, []);

  // Checksum
  let res = data
    .map((x) => (x != -1 ? x : 0))
    .reduce((acc, x, i) => acc + i * x, 0);

  console.log(res);
};
