import {
  countWith,
  filterCoords,
  findNeighbours,
  makeNumberMatrix,
  QUAD_DIRECTIONS,
} from "../utils";

/***
 * Day 10: Hoof It
 */

export const solutionA = (input: string) => {
  const grid = makeNumberMatrix(input, "");

  const startingPoints = filterCoords(grid, (cell) => cell === 0);

  const res = countWith(startingPoints, (start) => {
    const todo = [start];
    const nines = new Set<string>();

    // DFS
    while (todo.length > 0) {
      const coords = todo.pop();
      if (!coords) {
        break;
      }
      const [x, y] = coords;
      const height = grid[y][x];

      if (height === 9) {
        nines.add(coords.join(","));
        continue;
      }

      // Find valid paths forward
      findNeighbours(grid, x, y, QUAD_DIRECTIONS).forEach(([newX, newY]) => {
        if (grid[newY][newX] - 1 === height) {
          todo.push([newX, newY]);
        }
      });
    }
    return nines.size;
  });

  console.log(res);
};

export const solutionB = (input: string) => {
  const grid = makeNumberMatrix(input, "");

  const startingPoints = filterCoords(grid, (cell) => cell === 0);

  const res = countWith(startingPoints, (start) => {
    const todo = [start];
    let rating = 0;

    // DFS
    while (todo.length > 0) {
      const coords = todo.pop();
      if (!coords) {
        break;
      }
      const [x, y] = coords;
      const height = grid[y][x];

      if (height === 9) {
        rating += 1;
        continue;
      }

      // Find valid paths forward
      findNeighbours(grid, x, y, QUAD_DIRECTIONS).forEach(([newX, newY]) => {
        if (grid[newY][newX] - 1 === height) {
          todo.push([newX, newY]);
        }
      });
    }
    return rating;
  });

  console.log(res);
};
