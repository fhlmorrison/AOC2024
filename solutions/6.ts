/***
 * Day 6: Guard Gallivant
 */

import {
  checkMatrixBounds,
  countIf,
  countWith,
  makeCharMatrix,
  QUAD_DIRECTIONS,
} from "../utils";

export const solutionA = (input: string) => {
  const grid = makeCharMatrix(input);

  followRoute(grid);
  const result = countWith(grid, (row) => row.filter((c) => c === "X").length);
  console.log(result);
};

export const solutionB = (input: string) => {
  const grid = makeCharMatrix(input);

  const guardStartX = grid.findIndex((r) => r.includes("^"));
  const guardStartY = grid[guardStartX].indexOf("^");

  // Adds X to the grid where the guard has been
  followRoute(grid);

  // Reset the guard position to avoid counting it
  grid[guardStartX][guardStartY] = "^";

  const result = countWith(grid, (row, x) =>
    countIf(row, (c, y) => {
      if (c !== "X") return false;
      grid[x][y] = "#";
      const hasLoop = isLoopRoute(grid, guardStartX, guardStartY);
      grid[x][y] = ".";
      return hasLoop;
    })
  );
  console.log(result);
  return;
};

/**
 * Adds X to the grid where the guard has been
 * @param grid Grid to follow the route on
 */
const followRoute = (grid: string[][]) => {
  let x = grid.findIndex((r) => r.includes("^"));
  let y = grid[x].indexOf("^");

  let guardDir = QUAD_DIRECTIONS[0];

  while (checkMatrixBounds(grid, x, y)) {
    // Find next position
    let nx = x + guardDir[0];
    let ny = y + guardDir[1];
    if (!checkMatrixBounds(grid, nx, ny)) {
      grid[x][y] = "X";
      break;
    }

    // Turn if we hit an obstacle
    let newChar = grid[nx][ny];
    while (newChar === "#") {
      guardDir = QUAD_DIRECTIONS[(QUAD_DIRECTIONS.indexOf(guardDir) + 1) % 4];
      nx = x + guardDir[0];
      ny = y + guardDir[1];
      newChar = grid[nx][ny];
    }

    // Mark previous position as visited
    grid[x][y] = "X";

    // Move to the next position
    x = nx;
    y = ny;
  }
};

// Finds if the route ends up in a loop
const isLoopRoute = (grid: string[][], startX: number, startY: number) => {
  let x = startX;
  let y = startY;

  let guardDirIndex = 0;
  let guardDir = QUAD_DIRECTIONS[guardDirIndex];

  // Store the steps taken to check if we loop
  let steps = new Set<string>();

  while (checkMatrixBounds(grid, x, y)) {
    // Find next position
    let nx = x + guardDir[0];
    let ny = y + guardDir[1];
    if (!checkMatrixBounds(grid, nx, ny)) {
      // Exited the grid (not a loop)
      return false;
    }

    // Turn if we hit an obstacle
    let newChar = grid[nx][ny];
    while (newChar === "#") {
      guardDirIndex = (guardDirIndex + 1) % 4;
      guardDir = QUAD_DIRECTIONS[guardDirIndex];
      nx = x + guardDir[0];
      ny = y + guardDir[1];
      newChar = grid[nx][ny];
    }

    // Move to the next position
    x = nx;
    y = ny;

    // Serialize the current step for comparison in the set
    const currentStep = [x, y, guardDirIndex].join(",");

    if (steps.has(currentStep)) {
      // Found a loop
      return true;
    }
    steps.add(currentStep);
  }
  // Exited the grid (not a loop)
  return false;
};
