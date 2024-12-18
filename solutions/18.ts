/***
 * Day 0: Template
 */

import { makeNumberMatrix } from "../utils";

const EXIT = {
  x: 70,
  y: 70,
};

const TEST_EXIT = {
  x: 6,
  y: 6,
};

export const solutionA = (input: string) => {
  const coordinates = makeNumberMatrix(input, ",").map(([x, y]) => ({ x, y }));

  const kilobyte = coordinates.slice(0, 1024);

  const exit = EXIT;

  let unsafeCells = new Set<string>();

  kilobyte.forEach(({ x, y }) => {
    unsafeCells.add(`${x},${y}`);
  });

  const visited = new Map<string, number>();

  const todo = [{ x: 0, y: 0, steps: 0 }];

  while (todo.length > 0) {
    const { x, y, steps } = todo.shift()!;

    const key = `${x},${y}`;
    let currentSteps = visited.get(key);
    if (currentSteps !== undefined && currentSteps <= steps) {
      continue;
    }

    visited.set(key, steps);

    if (x === exit.x && y === exit.y) {
      continue;
    }

    const neighbors = [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ];

    for (const neighbor of neighbors) {
      const { x, y } = neighbor;
      if (x < 0 || y < 0 || x > exit.x || y > exit.x) {
        continue;
      }
      const key = `${x},${y}`;
      if (unsafeCells.has(key)) {
        continue;
      }

      todo.push({ x, y, steps: steps + 1 });
    }
  }
  let result = visited.get(`${exit.x},${exit.y}`);

  console.log(result);
};

export const solutionB = (input: string) => {
  const coordinates = makeNumberMatrix(input, ",").map(([x, y]) => ({ x, y }));

  const exit = EXIT;
  const start = 1024;

  let unsafeCells = new Set<string>();

  let lastCell = null;
  for (let cellCount = start; cellCount < coordinates.length; cellCount++) {
    const kilobyte = coordinates.slice(0, cellCount + 1);
    kilobyte.forEach(({ x, y }) => {
      unsafeCells.add(`${x},${y}`);
    });

    const visited = new Map<string, number>();

    const todo = [{ x: 0, y: 0, steps: 0 }];

    while (todo.length > 0) {
      const { x, y, steps } = todo.shift()!;

      const key = `${x},${y}`;
      let currentSteps = visited.get(key);
      if (currentSteps !== undefined && currentSteps <= steps) {
        continue;
      }

      visited.set(key, steps);

      if (x === exit.x && y === exit.y) {
        continue;
      }

      const neighbors = [
        { x: x + 1, y },
        { x: x - 1, y },
        { x, y: y + 1 },
        { x, y: y - 1 },
      ];

      for (const neighbor of neighbors) {
        const { x, y } = neighbor;
        if (x < 0 || y < 0 || x > exit.x || y > exit.x) {
          continue;
        }
        const key = `${x},${y}`;
        if (unsafeCells.has(key)) {
          continue;
        }

        todo.push({ x, y, steps: steps + 1 });
      }
    }
    let result = visited.get(`${exit.x},${exit.y}`);

    if (result === undefined) {
      lastCell = cellCount;
      break;
    }
  }

  if (lastCell === null) {
    console.log("No solution found");
    return;
  }

  console.log(lastCell);
  let result = coordinates[lastCell];
  console.log(`${result.x},${result.y}`);
};
